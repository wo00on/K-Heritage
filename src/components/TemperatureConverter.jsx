import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import TemperatureInput from './TemperatureInput_010';
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

  // Ui 렌더링 영역
  return (
    <Container>
      <ContentGrid>
        {/* 데스크탑 뷰: 왼쪽 사이드바에 세계 시계 배치 */}
        {/* 다크 테마 박스로 시각적 무게감을 주어 디자인 밸런스를 맞춤 */}
        <DesktopClockWrapper>
          <DarkSectionBox>
            <WorldClock />{/*시계 불러오고*/}
          </DarkSectionBox>
        </DesktopClockWrapper>

        {/* 중앙 메인 컨텐츠: 온도 변환기 */}
        <SectionBox>


          {/* 영ㅇ어 지원을 적용한 메인 타이틀, 함수 t 사용 */}
          <Title>{t('converter', 'title')}</Title>

          {/* 온도 입력 필드 영역: 섭씨와 화씨 입력을 위한 재사용 컴포넌트 사용 */}
          <InputsWrapper>
            {/* 섭씨 입력 컴포넌트 - State lifting을 통해 부모에서 상태 관리 */}
            <TemperatureInput
              scale="c"
              temperature={celsius}
              onTemperatureChange={handleCelsiusChange}
            />
            {/* 화씨 입력 컴포넌트 - 입력 시 즉시 반대 단위로 변환되어 표시됨 */}
            <TemperatureInput
              scale="f"
              temperature={fahrenheit}
              onTemperatureChange={handleFahrenheitChange}
            />
          </InputsWrapper>
        </SectionBox>

        {/* 오른쪽 사이드바: 부가설명 넣어조기, 예를 들어서 외국인에게 설명을 하는 */}
        {/* 회색 배경의 박스로 메인 컨텐츠와 구분되는 보조 정보로 넣어놨음 */}
        <GraySectionBox>
          <InfoTitle>{t('converter', 'explanationTitle')}</InfoTitle>

          <InfoText dangerouslySetInnerHTML={{ __html: t('converter', 'explanation').replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </GraySectionBox>
      </ContentGrid>
    </Container>
  );
}
