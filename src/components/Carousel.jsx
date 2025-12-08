import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 40px 20px;
`;

const Track = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.$currentIndex * (100 / props.$itemsToShow)}%);
`;

const Slide = styled.div`
  flex: 0 0 ${props => 100 / props.$itemsToShow}%;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.5s ease;
  transform: ${props => props.$isCenter ? 'scale(1.1)' : 'scale(0.9)'};
  opacity: ${props => props.$isCenter ? '1' : '0.8'};
  z-index: ${props => props.$isCenter ? '10' : '1'};
  filter: ${props => props.$isCenter ? 'none' : 'grayscale(20%)'};
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: 1px solid #eee;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    background: #f8f8f8;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;

//전체 디자인 및 기능 구현, 1차 테스트 진행 : 디자인을 하나씩 대입 후 적용 유무 판단하기 
export default function Carousel({ children, itemsToShow = 4 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children);
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  const next = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };


  //1차 테스트 진행하기 return시 기능 작동 유무 확인하기, (초반 실패 후, 캐러셀 수정 후 기능 구현 성공)
  return (
    <CarouselContainer>
      {currentIndex > 0 && (
        <Button className="prev" onClick={prev}>&lt;</Button>
      )}
      <Track $currentIndex={currentIndex} $itemsToShow={itemsToShow}>
        {React.Children.map(children, (child, index) => {
          const isCenter = index === currentIndex + Math.floor(itemsToShow / 2);
          return (
            <Slide $itemsToShow={itemsToShow} $isCenter={isCenter}>
              {child}
            </Slide>
          );
        })}
      </Track>
      {currentIndex < maxIndex && (
        <Button className="next" onClick={next}>&gt;</Button>
      )}
    </CarouselContainer>
  );
}
