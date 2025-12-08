import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { API } from '../lib/api';
import { useLanguage } from '../contexts/LanguageContext';
import Carousel from '../components/Carousel';
import TemperatureConverter from '../components/TemperatureConverter';

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
    fetch(`${API}/products?_limit=12`).then(r => r.json()).then(setProducts);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const videos = ['/images/korea_c.mp4', '/images/korea_k.mp4'];
  const videoRefs = React.useRef([]);

  const handleVideoEnd = (index) => {
    const nextIndex = (index + 1) % videos.length;

    // korea_c.mp4 끝나면 korea_k.mp4 재생
    if (videoRefs.current[nextIndex]) {
      videoRefs.current[nextIndex].currentTime = 0;
      videoRefs.current[nextIndex].play();
    }

    // 2번째 동영상 스타트 동영상이 이어지면서 끊기는 문제 발생(문제 해결완료)
    setActiveIndex(nextIndex);
  };

  return (
    <div>
      <Hero>
        {videos.map((src, index) => (
          <VideoBackground
            key={index}
            ref={el => videoRefs.current[index] = el}
            src={src}
            $isActive={activeIndex === index}
            autoPlay={index === 0}
            muted
            playsInline
            onEnded={() => handleVideoEnd(index)}
          />
        ))}
        <HeroContent>
          <Title>{t('home', 'heroTitle')}</Title>
          <Subtitle>{t('home', 'heroSubtitle')}</Subtitle>
          <CTA to="/culture">{t('home', 'heroCTA')}</CTA>
        </HeroContent>
      </Hero>

      <Section>
        <SectionHeader>
          <SectionTitle>{t('home', 'sectionHeritage')}</SectionTitle>
          <MoreLink to="/culture">{t('home', 'viewAll')}</MoreLink>
        </SectionHeader>
        <Grid>
          {heritage.map(h => (
            <Card key={h.id} to={`/culture/${h.id}`}>
              <ImageBox>
                {h.images && h.images[0] && <img src={h.images[0]} alt={t('palaces', `${h.id}_name`)} />}
              </ImageBox>
              <CardTitle>{t('palaces', `${h.id}_name`)}</CardTitle>
              <CardDesc>{t('palaces', `${h.id}_desc`)}</CardDesc>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <TemperatureConverter />
      </Section>

      <PalaceSection>
        <PalaceTitle>{t('home', 'palaceTitle')}</PalaceTitle>
        <PalaceDesc>{t('home', 'palaceDesc')}</PalaceDesc>
      </PalaceSection>

      <Section>
        <SectionHeader>
          <SectionTitle>{t('home', 'sectionGoods')}</SectionTitle>
          <MoreLink to="/shop">{t('home', 'viewAll')}</MoreLink>
        </SectionHeader>

        <Carousel itemsToShow={5}>
          {products.map(p => (
            <Card key={p.id} to={`/shop/${p.id}`}>
              <ImageBox>
                {p.images && p.images[0] && <img src={p.images[0]} alt={p.name} />}
              </ImageBox>
              <CardTitle>{p.name}</CardTitle>
              <CardDesc>{p.price.toLocaleString()}won</CardDesc>
            </Card>
          ))}
        </Carousel>
      </Section>
    </div>
  );
}
