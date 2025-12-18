import React from 'react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';

import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
  font-family: 'Noto Serif KR', serif;
`;

const CartList = styled.div`
  border-top: 1px solid #eee;
`;

const CartItem = styled.div`
  display: flex;
  padding: 24px 0;
  border-bottom: 1px solid #eee;
  gap: 20px;
  align-items: center;
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  background: #f5f5f5;
  border-radius: 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 8px;
  font-size: 1.1rem;
`;

const ItemPrice = styled.div`
  color: #666;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  button {
    width: 32px;
    height: 32px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background: #f5f5f5;
    }
  }
  
  span {
    font-weight: 600;
    min-width: 20px;
    text-align: center;
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #999;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 20px;
  font-size: 0.9rem;
  
  &:hover {
    color: crimson;
  }
`;

const TotalSection = styled.div`
  margin-top: 40px;
  text-align: right;
  padding-top: 20px;
  border-top: 2px solid #1a1a1a;
`;

const TotalPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  
  span {
    margin-right: 16px;
    font-size: 1rem;
    font-weight: 400;
    color: #666;
  }
`;

const CheckoutBtn = styled.button`
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 16px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: #333;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 80px 0;
  color: #888;
  
  a {
    display: inline-block;
    margin-top: 20px;
    color: #1a1a1a;
    text-decoration: underline;
  }
`;

export default function Cart() {
  // 전역 상태관리: 장바구니 데이터 및 조작 함수 가져오기
  const { cart, updateQuantity, removeFromCart } = useCart();

  // 총 결제금액 계산: reduce 고차 함수를 사용하여 배열의 합계 도출
  // (초기값 0부터 시작하여 각 아이템의 가격 * 수량을 누적)
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Guard Clause: 장바구니가 비었을 때 조기 리턴하여 불필요한 렌더링 방지
  if (cart.length === 0) {
    return (
      <Container>
        <Title>장바구니</Title>
        <EmptyCart>
          <Link to="/shop">쇼핑하러 가기</Link>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <Title>장바구니</Title>
      <CartList>
        {cart.map(item => (
          // key prop: 효율적인 DOM 업데이트를 위해 고유 ID 사용 필수
          <CartItem key={item.id}>
            <ItemImage>
              {/* 이미지 데이터 존재 여부 확인하고 적용하기  */}
              {item.images && item.images[0] && <img src={item.images[0]} alt={item.name} />}
            </ItemImage>
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
              {/* toLocaleString(): 가격 천단위 콤마 자동 포맷팅 */}
              <ItemPrice>{item.price.toLocaleString()}won</ItemPrice>
            </ItemInfo>
            <QuantityControl>
              {/* 수량 변경 핸들러: 아이템 ID와 증감값을 전달하여 전역 상태 업데이트 */}
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </QuantityControl>
            {/* 삭제 핸들러: 해당 아이템 ID로 리스트에서 제거 */}
            <RemoveBtn onClick={() => removeFromCart(item.id)}>삭제</RemoveBtn>
          </CartItem>
        ))}
      </CartList>
      <TotalSection>
        <TotalPrice><span>총 결제금액</span> {total.toLocaleString()}won</TotalPrice>
        <CheckoutBtn onClick={() => alert('준비 중입니다.')}>구매하기</CheckoutBtn>
      </TotalSection>
    </Container>
  );
}
