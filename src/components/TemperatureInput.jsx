import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const Fieldset = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-family: 'Noto Serif KR', serif;
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 1.1rem;
  color: #1a1a1a;
  transition: all 0.2s;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 2px rgba(26, 26, 26, 0.1);
  }
`;

const Unit = styled.span`
  position: absolute;
  right: 16px;
  color: #888;
  font-size: 0.9rem;
`;

export default function TemperatureInput(props) {
  const { t } = useLanguage();

  const scaleNames = {
    c: t('converter', 'celsius'),
    f: t('converter', 'fahrenheit')
  };

  const handleChange = (e) => {
    props.onTemperatureChange(e.target.value);
  };

  return (
    <Fieldset>
      <Label>{scaleNames[props.scale]}</Label>
      <InputWrapper>
        <Input
          value={props.temperature}
          onChange={handleChange}
          type="number"
          placeholder="0"
        />
      </InputWrapper>
    </Fieldset>
  );
}
