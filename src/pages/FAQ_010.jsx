import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';


const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-family: 'Noto Serif KR', serif;
  margin-bottom: 16px;
  color: #1a1a1a;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const FAQList = styled.div`
  margin-bottom: 80px;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 24px 0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Question = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: #1a1a1a;
  font-weight: 600;
`;

const Answer = styled.p`
  color: #555;
  line-height: 1.6;
  margin: 0;
`;

export default function FAQ() {
  const { t } = useLanguage();

  return (
    <>
      <Container>
        <Header>
          <Title>{t('faq', 'title')}</Title>
          <Subtitle>{t('faq', 'subtitle')}</Subtitle>
        </Header>

        <FAQList>
          <FAQItem>
            <Question>Q. {t('faq', 'q1')}</Question>
            <Answer>A. {t('faq', 'a1')}</Answer>
          </FAQItem>
          <FAQItem>
            <Question>Q. {t('faq', 'q2')}</Question>
            <Answer>A. {t('faq', 'a2')}</Answer>
          </FAQItem>
          <FAQItem>
            <Question>Q. {t('faq', 'q3')}</Question>
            <Answer>A. {t('faq', 'a3')}</Answer>
          </FAQItem>
        </FAQList>
      </Container>


    </>
  );
}
