import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #1a1a1a;
  padding: 30px;
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: white;
  height: 100%;
  justify-content: center;
`;

const Title = styled.h3`
  font-family: 'Noto Serif KR', serif;
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 12px;
`;

const ClockItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const CityName = styled.span`
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 4px;
`;

const Time = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  font-family: monospace;
`;

function ClockDisplay({ city, timeZone }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <ClockItem>
            <CityName>{city}</CityName>
            <Time>{time.toLocaleTimeString('en-US', { timeZone, hour12: false })}</Time>
        </ClockItem>
    );
}

export default function WorldClock() {
    const { t } = useLanguage();

    return (
        <Container>
            <Title>{t('clock', 'title')}</Title>
            <ClockDisplay city={t('clock', 'seoul')} timeZone="Asia/Seoul" />
            <ClockDisplay city={t('clock', 'newyork')} timeZone="America/New_York" />
            <ClockDisplay city={t('clock', 'paris')} timeZone="Europe/Paris" />
        </Container>
    );
}
