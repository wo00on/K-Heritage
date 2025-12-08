import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../lib/api';
import { useLanguage } from '../contexts/LanguageContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 16px;
  font-family: 'Noto Serif KR', serif;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px 24px;
`;

const ProductCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 0;
  overflow: hidden;
  margin-bottom: 16px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const Info = styled.div``;

const Category = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Name = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 8px;
  font-weight: 500;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: #1a1a1a;
`;

export default function ShopList() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <Container>
      <Header>
        <Title>{t('shop', 'title')}</Title>
        <p>{t('shop', 'subtitle')}</p>
      </Header>
      <Grid>
        {products.map(p => (
          <ProductCard key={p.id} to={`/shop/${p.id}`}>
            <ImageWrapper>
              {p.images && p.images[0] && <img src={p.images[0]} alt={p.name} />}
            </ImageWrapper>
            <Info>
              <Category>{p.category}</Category>
              <Name>{p.name}</Name>
              <Price>{p.price.toLocaleString()}won</Price>
            </Info>
          </ProductCard>
        ))}
      </Grid>
    </Container>
  );
}
