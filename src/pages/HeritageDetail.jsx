import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  background: #f9f9f9;
  padding: 24px;
  border-radius: 12px;
`;

const InfoItem = styled.div`
  h4 {
    margin: 0 0 8px;
    color: #888;
    font-size: 0.9rem;
  }
  p {
    margin: 0;
    font-weight: 500;
    color: #333;
    font-size: 1.1rem;
  }
`;

const RelatedSection = styled.div`
  margin-top: 60px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
`;

const ProductCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  h3 {
    margin: 0 0 4px;
    font-size: 1rem;
  }
  
  p {
    margin: 0;
    font-weight: 700;
    color: #1a1a1a;
  }
`;

export default function HeritageDetail() {
  const { t } = useLanguage();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/heritage/${id}`)
      .then(res => res.json())
      .then(setItem);

    fetch(`${API}/products?relatedHeritageId=${id}`)
      .then(res => res.json())
      .then(setProducts);
  }, [id]);

  if (!item) return null;

  return (
    <Container>
      <Hero>
        {item.images && item.images[0] && <img src={item.images[0]} alt={t('palaces', `${item.id}_name`)} />}
        <HeroContent>
          <Category>{item.category}</Category>
          <Title>{t('palaces', `${item.id}_name`)}</Title>
        </HeroContent>
      </Hero>

      <ContentWrapper>
        <InfoCard>
          <SectionTitle>{t('heritage', 'intro')}</SectionTitle>
          <Description>{t('palaces', `${item.id}_desc`)}</Description>

          <InfoGrid>
            <InfoItem>
              <h4>{t('heritage', 'location')}</h4>
              <p>{item.location}</p>
            </InfoItem>
            <InfoItem>
              <h4>{t('heritage', 'hours')}</h4>
              <p>{item.visitingHours}</p>
            </InfoItem>
          </InfoGrid>

          {id === 'gyeongbokgung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'gyeongbokgungDetail')}
            </Description>
          )}

          {id === 'changdeokgung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'changdeokgungDetail')}
            </Description>
          )}

          {id === 'changgyeonggung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'changgyeonggungDetail')}
            </Description>
          )}

          {id === 'deoksugung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'deoksugungDetail')}
            </Description>
          )}

          {id === 'gyeonghuigung' && (
            <Description style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 40 }}>
              {t('heritage', 'gyeonghuigungDetail')}
            </Description>
          )}
        </InfoCard>

        {products.length > 0 && (
          <RelatedSection>
            <SectionTitle>{t('heritage', 'relatedGoods')}</SectionTitle>
            <ProductGrid>
              {products.slice(0, 2).map(p => (
                <ProductCard key={p.id} to={`/shop/${p.id}`}>
                  <img src={p.images[0]} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>{p.price.toLocaleString()}won</p>
                </ProductCard>
              ))}
            </ProductGrid>
          </RelatedSection>
        )}
      </ContentWrapper>
    </Container>
  );
}
