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

  // UI 렌더링 영역: 반응형 레이아웃을 위해 ContentGrid를 사용합니다.
  return (
    <Container>
      <ContentGrid>
        {/* 데스크탑 뷰: 왼쪽 사이드바에 세계 시계 배치 (모바일에서는 숨김) */}
        {/* 다크 테마 박스로 시각적 무게감을 주어 디자인 밸런스를 맞춤 */}
        <DesktopClockWrapper>
          <DarkSectionBox>
            <WorldClock />{/*시계 불러오기, 교과서 활용*/}
          </DarkSectionBox>
        </DesktopClockWrapper>

        {/* 중앙 메인 컨텐츠: 온도 변환기 */}
        <SectionBox>
          {/* 모바일 뷰: 상단에 세계 시계 배치 (데스크탑에서는 숨김) */}
          <MobileClockWrapper>
            <WorldClock />
          </MobileClockWrapper>

          {/* 다국어 지원을 적용한 메인 타이틀 */}
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

        {/* 오른쪽 사이드바: 부가 설명 및 가이드 */}
        {/* 회색 배경의 박스로 메인 컨텐츠와 구분되는 보조 정보임을 시사 */}
        <GraySectionBox>
          <InfoTitle>{t('converter', 'explanationTitle')}</InfoTitle>
          {/* 
            dangerouslySetInnerHTML 사용 이유:
            번역 텍스트 내의 HTML 태그(줄바꿈 <br/>, 강조 <strong>)를 실제로 렌더링하기 위함.
            보안상 주의가 필요한 속성이지만, 신뢰할 수 있는 내부 텍스트(locales)만 사용하므로 안전함.
          */}
          <InfoText dangerouslySetInnerHTML={{ __html: t('converter', 'explanation').replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </GraySectionBox>
      </ContentGrid>
    </Container>
  );
}
