import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../lib/api';
import { useLanguage } from '../contexts/LanguageContext';

const Container = styled.div`
  padding-bottom: 80px;
`;

const Hero = styled.div`
  height: 60vh;
  min-height: 400px;
  position: relative;
  background-color: #eee;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  }
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0 0 16px;
  font-family: 'Noto Serif KR', serif;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const Category = styled.span`
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
  border-radius: 30px;
  font-size: 1rem;
  margin-bottom: 16px;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: -60px auto 0;
  position: relative;
  z-index: 10;
  padding: 0 20px;
`;

const InfoCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 24px;
  font-family: 'Noto Serif KR', serif;
  color: #1a1a1a;
  border-bottom: 2px solid #eee;
  padding-bottom: 16px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 32px;
  white-space: pre-line;
`;





// 문화유산 상세 페이지 컴포넌트
export default function HeritageDetail() {
  // 영어 지원 훅 사용, 
  const { t } = useLanguage();
  // URL 파라미터에서 문화유산 ID(예: gyeongbokgung) 추출
  const { id } = useParams();

  // 상태 관리: 문화유산 상세 정보
  const [item, setItem] = useState(null);

  // 데이터 로딩 훅: ID가 변경될 때마다 실행
  useEffect(() => {
    // 해당 궁의 상세 정보를 가져옴,\
    //쿼리 활용 하지만 이 부분은 백엔드 지식 기반으로 활용한 거여서 유지보수에 어려움이 있음

    fetch(`${API}/heritage/${id}`)
      .then(res => res.json())
      .then(setItem);


  }, [id]);

  // 데이터가 로딩되기 전에는 아무것도 렌더링하지 않음 (로딩 스피너 등을 추가할 수 있음)
  if (!item) return null;

  return (
    <Container>
      {/* 상단 히어로 섹션: 문화유산의 대표 이미지와 이름을 웅장하게 표시 */}
      <Hero>
        {item.images && item.images[0] && <img src={item.images[0]} alt={t('palaces', `${item.id}_name`)} />}
        <HeroContent>
          <Category>{item.category}</Category>
          {/* 키를 사용하여 문화유산 이름 표시, db에서 가져다 쓰고 있음 */}
          <Title>{t('palaces', `${item.id}_name`)}</Title>
        </HeroContent>
      </Hero>

      {/* 메인 컨텐츠 영역: 상세 설명 및 관람 정보 */}
      <ContentWrapper>
        <InfoCard>
          <SectionTitle>{t('heritage', 'intro')}</SectionTitle>
          <Description>{t('palaces', `${item.id}_desc`)}</Description>



          {/*  각각ㄱ의  궁궐별 상세 설명 (조건부 렌더링) */}
          {/* ID에 따라 다른 상세 설명 텍스트를 불러와 표시함, db에서 가져다 쓰고 있음 */}

          {/* 경복궁 상세 설명 */}
          {id === 'gyeongbokgung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'gyeongbokgungDetail')}
            </Description>
          )}

          {/* 창덕궁 상세 설명 */}
          {id === 'changdeokgung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'changdeokgungDetail')}
            </Description>
          )}

          {/* 창경궁 상세 설명 */}
          {id === 'changgyeonggung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'changgyeonggungDetail')}
            </Description>
          )}

          {/* 덕수궁 상세 설명, 자료 정보가 많이 없어서 gpt화용ㅇ */}
          {id === 'deoksugung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'deoksugungDetail')}
            </Description>
          )}

          {/* 경희궁 상세 설명 */}
          {id === 'gyeonghuigung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'gyeonghuigungDetail')}
            </Description>
          )}
        </InfoCard>



      </ContentWrapper>
    </Container>
  );
}
