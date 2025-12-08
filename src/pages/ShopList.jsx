import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../lib/api';
import { useLanguage } from '../contexts/LanguageContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 16px;
  font-family: 'Noto Serif KR', serif;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px 24px;
`;

// 접근성 및 UX: 카드 전체를 Link로 감싸서 클릭 영역을 넓힘 (이미지나 텍스트만 클릭되는 것보다 나음)
const ProductCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  

  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 0;
  overflow: hidden;
  margin-bottom: 16px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const Info = styled.div``;

const Category = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Name = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 8px;
  font-weight: 500;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: #1a1a1a;
`;

export default function ShopList() {
  // 다국어 지원 훅: 현재 언어 설정에 맞는 텍스트를 가져오기 위해 사용 (전역 상태)
  const { t } = useLanguage();
  
  // 상품 목록 상태: 초기값을 빈 배열([])로 설정하여 데이터 로딩 전 map 에러 방지
  // (null로 하면 렌더링 부분에서 ?. 로 체크해야 해서 번거로움)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 컴포넌트 마운트 시점에만 API 호출 (의존성 배열이 빈 배열)
    // 불필요한 재요청을 막아 서버 부하를 줄임
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(setProducts)
      // 실제 서비스라면 catch로 에러 처리도 해야 하지만, 과제 범위상 생략함
      .catch(e => console.error("상품 로딩 실패:", e));
  }, []);

  return (
    <Container>
      <Header>
        <Title>{t('shop', 'title')}</Title>
        <p>{t('shop', 'subtitle')}</p>
      </Header>
      <Grid>
        {products.map(p => (
          // key prop: 리액트가 DOM 업데이트 성능을 최적화할 때 사용함 (유니크한 DB ID 사용 필수)
          <ProductCard key={p.id} to={`/shop/${p.id}`}>
            <ImageWrapper>
              {/* 이미지가 없을 경우를 대비한 방어 코드 (&& 연산자 사용) */}
              {p.images && p.images[0] && <img src={p.images[0]} alt={p.name} />}
            </ImageWrapper>
            <Info>
              <Category>{p.category}</Category>
              <Name>{p.name}</Name>
              {/* toLocaleString: 천단위 콤마(,) 자동 처리 (프론트엔드 필수 유틸) */}
              <Price>{p.price.toLocaleString()}won</Price>
            </Info>
          </ProductCard>
        ))}
      </Grid>
    </Container>
  );
}
