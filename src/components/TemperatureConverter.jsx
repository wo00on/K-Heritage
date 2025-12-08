import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import TemperatureInput from './TemperatureInput';
import WorldClock from './WorldClock';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 280px 1fr 300px;
  }
`;

const SectionBox = styled.div`
  background: white;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const DarkSectionBox = styled(SectionBox)`
  background: #1a1a1a;
  color: white;
  padding: 40px 30px;
`;

const GraySectionBox = styled(SectionBox)`
  background: #f8f9fa;
  border: 1px solid #eee;
`;

const MobileClockWrapper = styled.div`
  display: none;
  margin-bottom: 30px;
  @media (max-width: 1023px) {
    display: block;
  }
`;

const DesktopClockWrapper = styled.div`
  height: 100%;
  @media (max-width: 1023px) {
    display: none;
  }
`;

const Title = styled.h2`
  font-family: 'Noto Serif KR', serif;
  font-size: 1.8rem;
  margin-bottom: 40px;
  color: #1a1a1a;
  text-align: center;
`;

const InfoTitle = styled.h3`
  font-family: 'Noto Serif KR', serif;
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #1a1a1a;
`;

const InfoText = styled.div`
  color: #555;
  line-height: 1.7;
  font-size: 1rem;

  strong {
    color: #1a1a1a;
    font-weight: 600;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export default function TemperatureConverter() {
  const { t } = useLanguage();
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  const handleCelsiusChange = (temperature) => {
    setTemperature(temperature);
    setScale("c");
  };

  const handleFahrenheitChange = (temperature) => {
    setTemperature(temperature);
    setScale("f");
  };

  const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <Container>
      <ContentGrid>
        <DesktopClockWrapper>
          <DarkSectionBox>
            <WorldClock />
          </DarkSectionBox>
        </DesktopClockWrapper>

        <SectionBox>
          <MobileClockWrapper>
            <WorldClock />
          </MobileClockWrapper>
          <Title>{t('converter', 'title')}</Title>
          <InputsWrapper>
            <TemperatureInput
              scale="c"
              temperature={celsius}
              onTemperatureChange={handleCelsiusChange}
            />
            <TemperatureInput
              scale="f"
              temperature={fahrenheit}
              onTemperatureChange={handleFahrenheitChange}
            />
          </InputsWrapper>
        </SectionBox>

        <GraySectionBox>
          <InfoTitle>{t('converter', 'explanationTitle')}</InfoTitle>
          <InfoText dangerouslySetInnerHTML={{ __html: t('converter', 'explanation').replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </GraySectionBox>
      </ContentGrid>
    </Container>
  );
}
