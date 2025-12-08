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

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
`;

const Card = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  }
`;

const ImageWrapper = styled.div`
  height: 240px;
  background: #f0f0f0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${Card}:hover img {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 24px;
`;

const Category = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: #f5f5f5;
  color: #666;
  font-size: 0.85rem;
  border-radius: 20px;
  margin-bottom: 12px;
`;

const Name = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 8px;
  font-family: 'Noto Serif KR', serif;
`;

const Desc = styled.p`
  color: #888;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function HeritageList() {
  const { t } = useLanguage();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API}/heritage`)
      .then(res => res.json())
      .then(setItems);
  }, []);

  return (
    <Container>
      <Header>
        <Title>{t('heritage', 'title')}</Title>
        <Subtitle>{t('heritage', 'subtitle')}</Subtitle>
      </Header>
      <Grid>
        {items.map(item => (
          <Card key={item.id} to={`/culture/${item.id}`}>
            <ImageWrapper>
              {item.images && item.images[0] && <img src={item.images[0]} alt={item.name} />}
            </ImageWrapper>
            <Content>
              <Category>{item.category}</Category>
              <Name>{t('palaces', `${item.id}_name`)}</Name>
              <Desc>{t('palaces', `${item.id}_desc`)}</Desc>
            </Content>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
