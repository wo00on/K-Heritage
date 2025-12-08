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
  // 현재 보여줄 슬라이드의 시작 인덱스를 관리하는 상태 (0부터 시작)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자식 요소(슬라이드 아이템)의 전체 개수 계산
  const totalItems = React.Children.count(children);

  // 마지막 슬라이드가 보일 수 있는 최대 인덱스 계산
  // 전체 아이템 수에서 한번에 보여줄 개수를 뺀 값 (음수가 되지 않도록 0과 비교)
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  // 다음 슬라이드로 이동하는 함습
  const next = () => {
    // 최대 인덱스를 초과하지 않도록 현재 인덱스 + 1 설정
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  // 이전 슬라이드로 이동하는 함수
  const prev = () => {
    // 0보다 작아지지 않도록 현재 인덱스 - 1 설정
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };


  //1차 테스트 진행하기 return시 기능 작동 유무 확인하기, (초반 실패 후, 캐러셀 수정 후 기능 구현 성공)
  return (
    <CarouselContainer>
      {/* 첫 번째 슬라이드가 아닐 때만 '이전' 버튼 표시 */}
      {currentIndex > 0 && (
        <Button className="prev" onClick={prev}>&lt;</Button>
      )}

      {/* 슬라이드 트랙: 현재 인덱스에 따라 위치 이동 (translateX) */}
      <Track $currentIndex={currentIndex} $itemsToShow={itemsToShow}>
        {React.Children.map(children, (child, index) => {
          // 중앙에 위치한 아이템인지 계산 (선택사항: 중앙 강조 효과용)
          const isCenter = index === currentIndex + Math.floor(itemsToShow / 2);
          return (
            <Slide $itemsToShow={itemsToShow} $isCenter={isCenter}>
              {child}
            </Slide>
          );
        })}
      </Track>

      {/* 마지막 슬라이드에 도달하지 않았을 때만 '다음' 버튼 표시 */}
      {currentIndex < maxIndex && (
        <Button className="next" onClick={next}>&gt;</Button>
      )}
    </CarouselContainer>
  );
}
