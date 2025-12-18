import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Container = styled.footer`
  background: #1a1a1a;
  color: #fff;
  padding: 60px 20px;
  margin-top: 0;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
`;

const Section = styled.div``;

const Title = styled.h3`
  font-family: 'Noto Serif KR', serif;
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #fff;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 12px;
  }
  
  a {
    color: #999;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #fff;
    }
  }
`;
export default function Footer() {
  const { t } = useLanguage();
  return (
    <>
      <Container>
        <Content>
          <Section>
            <Title>K-Heritage</Title>
            <p style={{ color: '#999', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {t('footer', 'desc')}
            </p>
          </Section>

          <Section>
            <Title>{t('footer', 'menu')}</Title>
            <List>
              <li><Link to="/culture">{t('nav', 'culture')}</Link></li>
              <li><Link to="/shop">{t('nav', 'shop')}</Link></li>
              <li><Link to="/members">{t('nav', 'members')}</Link></li>
            </List>
          </Section>

          {/* 전부다 링크 걸어놓기!!! 잊지말기!!!, 일단 링크를 각 웹사이트 기본페이지로 가게 만들기 */}

          <Section>
            <Title>SNS</Title>
            <List>{/* 교과서에서 link거는 것 활용, 실제 footer도 이런식으로 구현함, 문서 참조 */}
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a></li>
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </List>
          </Section>
        </Content>

      </Container>
    </>
  );
}
