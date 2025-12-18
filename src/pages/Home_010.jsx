import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { API } from '../lib/api';
import { useLanguage } from '../contexts/LanguageContext';
import Carousel from '../components/Carousel';
import TemperatureConverter from '../components/TemperatureConverter';
import WelcomeBanner from '../components/WelcomeBanner_010';

const Hero = styled.div`
  height: 80vh;
  height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 1;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 115%; /* Scale up to allow cropping */
  object-fit: cover;
  transform: translate(-50%, -55%); /* Shift up to crop bottom */
  z-index: 0;
  opacity: ${props => props.$isActive ? 1 : 0};
  transition: opacity 0.5s ease;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-family: 'Noto Serif KR', serif;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  animation: ${fadeInUp} 1s ease-out forwards;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0; /* Start hidden */
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  animation: ${fadeInUp} 1s ease-out 0.3s forwards; /* 0.3s delay */
`;

const CTA = styled(Link)`
  display: inline-block;
  padding: 16px 32px;
  background: white;
  color: #1a1a1a;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0; /* Sharp corners */
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin: 0;
  font-family: 'Noto Serif KR', serif;
`;

const MoreLink = styled(Link)`
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 2px;
  
  &:hover {
    color: #1a1a1a;
    border-color: #1a1a1a;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const Card = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageBox = styled.div`
  height: 240px;
  overflow: hidden;
  border-radius: 0; /* Sharp corners */
  margin-bottom: 16px;
  background: #f0f0f0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 8px;
`;

const CardDesc = styled.p`
  color: #666;
  font-size: 0.95rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PalaceSection = styled.section`
  padding: 100px 20px;
  background: #f9f9f9;
  text-align: center;
`;

const PalaceTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 24px;
  font-family: 'Noto Serif KR', serif;
  color: #1a1a1a;
`;

const PalaceDesc = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 40px;
  white-space: pre-line;
`;

export default function Home() {
  const [heritage, setHeritage] = useState([]);
  const [products, setProducts] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    fetch(`${API}/heritage?_limit=3`).then(r => r.json()).then(setHeritage);
    fetch(`${API}/products?_limit=10`).then(r => r.json()).then(setProducts);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const videos = ['/images/korea_c.mp4', '/images/korea_k.mp4'];
  const videoRefs = React.useRef([]);

  // 동영상 재생이 끝났을 때 다음 동영상으로 전환하는 핸들러 함수, 중간중간 끊기는 현상 발생하여 수정 완료
  const handleVideoEnd = (index) => {
    // 현재 재생 중인 동영상의 다음 인덱스 계산 (마지막 동영상일 경우 처음으로 돌아감 - 순환 구조)
    const nextIndex = (index + 1) % videos.length;

    // 다음 순서의 동영상이 존재하는지 확인 
    // korea_c.mp4가 끝나면 korea_k.mp4로, korea_k.mp4가 끝나면 다시 korea_c.mp4로 이어짐
    if (videoRefs.current[nextIndex]) {
      // 다음 동영상을 처음부터 재생하기 위해 재생 시간을 0으로 초기화
      videoRefs.current[nextIndex].currentTime = 0;
      // 다음 동영상 재생 시작 - 끊김 없는 화면 전환을 위해 미리 재생 명령을 내림,플레이함수 사용
      videoRefs.current[nextIndex].play();
    }

    // 활성화된 동영상 인덱스 상태 업데이트
    // 이 상태 변화가 일어나야 CSS에서 opacity가 변경되어 화면에 실제로 보이게 됨
    // 2번째 동영상 스타트 시 깜빡임이나 끊김 현상을 방지하기 위해 play() 호출 후 상태 업데이트 순서 유지
    setActiveIndex(nextIndex);
  };

  // UI 렌더링 영역
  return (
    <div>
      {/*  메인 히어로 섹션 (동영상 배경 + 환영 메시지)만들어서 넣음 */}
      <Hero>
        {/* 배경 동영상 리스트 매핑 */}
        {videos.map((src, index) => (
          <VideoBackground
            key={index}
            ref={el => videoRefs.current[index] = el}
            src={src}
            // 현재 활성화된 인덱스일 때만 투명도를 1로 설정하여 보이게 함
            $isActive={activeIndex === index}
            // 첫 번째 동영상만 자동 재생 시작
            autoPlay={index === 0}
            muted // 브라우저 정책상 자동 재생을 위해 음소거 필수
            playsInline // 모바일에서 전체화면으로 재생되지 않도록 설정
            onEnded={() => handleVideoEnd(index)} // 재생 종료 시 다음 영상으로 전환
          />
        ))}
        {/* 영상 위에 오버레이되는 텍스트 및 버튼 컨텐츠 */}
        <HeroContent>
          <Title>{t('home', 'heroTitle')}</Title>
          <Subtitle>{t('home', 'heroSubtitle')}</Subtitle>
          <CTA to="/culture">{t('home', 'heroCTA')}</CTA>
        </HeroContent>
      </Hero>

      <WelcomeBanner />

      {/*  문화유산 소개 섹션  */}
      <Section>
        <SectionHeader>
          <SectionTitle>{t('home', 'sectionHeritage')}</SectionTitle>
          <MoreLink to="/culture">{t('home', 'viewAll')}</MoreLink>
        </SectionHeader>
        {/* 그리드 레이아웃으로 문화유산 카드 배치 */}
        <Grid>
          {heritage.map(h => (
            <Card key={h.id} to={`/culture/${h.id}`}>
              <ImageBox>
                {/*첫 번째 이미지를 썸네일로 사용 */}
                {h.images && h.images[0] && <img src={h.images[0]} alt={t('palaces', `${h.id}_name`)} />}
              </ImageBox>
              {/* 영어 지원을 위해 t 함수 사용 */}
              <CardTitle>{t('palaces', `${h.id}_name`)}</CardTitle>
              <CardDesc>{t('palaces', `${h.id}_desc`)}</CardDesc>
            </Card>
          ))}
        </Grid>
      </Section>

      {/*  섹션 (온도 변환기 포함) 교과서 활용하여 구현 */}
      <Section>
        {/* 온도 변환 기능과 세계 시각을 제공하는 컴포넌트 삽입 */}
        <TemperatureConverter />
      </Section>

      {/*  궁궐 소개 텍스트 섹션 */}
      {/*  스타일이 적용된 섹션으로 텍스트 표시, db에서 데이터 갖고와서 활용 */}
      <PalaceSection>
        <PalaceTitle>{t('home', 'palaceTitle')}</PalaceTitle>
        <PalaceDesc>{t('home', 'palaceDesc')}</PalaceDesc>
      </PalaceSection>

      {/*  샵 미리보기 섹션 (캐러셀 기능 포함하여서 구현함), 캐러셀 구현 완료, 부분 실패 */}
      <Section>
        <SectionHeader>
          <SectionTitle>{t('home', 'sectionGoods')}</SectionTitle>
          <MoreLink to="/shop">{t('home', 'viewAll')}</MoreLink>
        </SectionHeader>

        {/* 상품 목록을 슬라이드 형태로 보여주기 위한 캐러셀 컴포넌트 사용 */}
        {/* itemsToShow={5}: 한 화면에 5개의 상품 카드를 보여줌, 근데 완벽한 구현 실패, 양쪽 끝으로 이동이 안된다.. */}
        {/*커널이 cnn 하는 것처럼 음 임의의 값을 줘야하는지 잘 모르겠음, 일단 임의의 값줘보기  */}
        <Carousel itemsToShow={5}>
          {products.map(p => (
            <Card key={p.id} to={`/shop/${p.id}`}>
              <ImageBox>
                {/* 상품 이미지 표시하기  */}
                {p.images && p.images[0] && <img src={p.images[0]} alt={p.name} />}
              </ImageBox>
              <CardTitle>{p.name}</CardTitle>
              {/* 가격 포맷팅 (원 단위 won),  */}
              <CardDesc>{p.price.toLocaleString()}won</CardDesc>
            </Card>
          ))}
        </Carousel>
      </Section>
    </div>
  );
}
