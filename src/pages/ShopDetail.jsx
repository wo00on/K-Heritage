import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../lib/api';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  

  
  // 모바일에서는 세로로 배치 (반응형)
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ImageSection = styled.div`
  background: #f5f5f5;
  border-radius: 0;
  overflow: hidden;

  aspect-ratio: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Category = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const Name = styled.h1`
  font-size: 2rem;
  margin: 0 0 16px;
  font-family: 'Noto Serif KR', serif;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 32px;
  color: #1a1a1a;
`;



const Button = styled.button`
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 18px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #333;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export default function ShopDetail() {
  const { t } = useLanguage();
  // URL 파라미터에서 상품 ID 추출 (예: /shop/1 -> id는 "1")
  const { id } = useParams();
  // 페이지 이동을 위한 훅 (장바구니 담기 후 이동용)
  const navigate = useNavigate();

  // 초기값 null: 데이터가 로딩되기 전 상태를 명시적으로 표현
  const [product, setProduct] = useState(null);
  // 전역 카트 상태에 접근하기 위한 커스텀 훅
  const { addToCart } = useCart();

  useEffect(() => {
    // 의존성 배열에 [id] 포함: 관련 상품 클릭 등으로 ID가 바뀌면 새로 요청해야 함
    // (빈 배열로 두면 ID가 바껴도 화면이 안 바뀌는 버그 발생 가능)
    //기초 백엔드 지식을 기반으로 작성하였지만 db를 구축하지 않은 상태여서 유지보수가 어려움
    //먼저 기본 구현에 집중하여 개발
    fetch(`${API}/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  // Guard Clause: 데이터 로딩 전에는 아무것도 렌더링하지 않음 (Null Check)
  // (실제로는 스켈레톤 UI나 로딩 스피너를 넣는게 좋음, 하지만 tailwindcss 로 구현하는게 아니여서)
  // 어려움이 있어서 사용을 하지 못함
  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);

    // 사용자 경험(UX): 장바구니로 바로 이동할지 선택권 부여 (window.confirm 사용)
    // 모달을 직접 구현하면 코드가 길어져서 브라우저 기본 기능 활용
    if (window.confirm(t('shop', 'added'))) {
      navigate('/cart');
    }
  };

  return (
    <Container>
      <ImageSection>
        {product.images && product.images[0] && <img src={product.images[0]} alt={product.name} />}
      </ImageSection>
      <InfoSection>
        <Category>{product.category}</Category>
        <Name>{product.name}</Name>
        {/* toLocaleString() 써서 천단위 콤마 자동 처리, 저 객체는 주로 날짜에서 쓰지만 숫자에서는 콤마를 넣어줘서 사용 */}
        <Price>{product.price.toLocaleString()}won</Price>

        <Button onClick={handleAddToCart}>{t('shop', 'addToCart')}</Button>
      </InfoSection>
    </Container>
  );
}
