// 헤더 컴포넌트
// 이 컴포넌트는 메인 네비게이션, 사용자 세션 상태, 언어 설정과 같은 전역 설정을 관리합니다.
// 현재 라우트에 따라 스타일을 동적으로 변경합니다 (홈에서는 투명, 그 외에는 흰색 배경).

import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../lib/api';

// Prop Drilling을 방지하기 위해 Context API를 사용하여 전역 상태를 관리합니다.
import { UserContext } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

// 헤더 바는 동적 스타일링 props를 사용
// 홈 페이지($isHome)에서는 히어로 이미지 위에 오버레이 시키기 (absolute 포지셔닝, 투명 배경).
// 백드롭 블러 효과가 있는 일반적인 스티키(sticky) 헤더로 동작합니다.
const Bar = styled.header`
  position: ${props => props.$isHome ? 'absolute' : 'sticky'};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: ${props => props.$isHome ? 'transparent' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: ${props => props.$isHome ? 'none' : 'blur(10px)'};
  box-shadow: ${props => props.$isHome ? 'none' : '0 2px 10px rgba(0,0,0,0.05)'};
  padding: 0 20px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
`;

const Brand = styled(Link)`
  // 'Noto Serif KR' 폰트를 사용하여 브랜드 명에 한국적인 유산의 프리미엄한 느낌을 줍니다.
  font-family: 'Noto Serif KR', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.$isHome ? 'white' : '#1a1a1a'};
  text-decoration: none;
  text-shadow: ${props => props.$isHome ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;

  a {
    text-decoration: none;
    color: ${props => props.$isHome ? 'rgba(255,255,255,0.9)' : '#444'};
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.2s;
    text-shadow: ${props => props.$isHome ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'};

    &:hover {
      color: ${props => props.$isHome ? 'white' : '#1a1a1a'};
    }
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  color: ${props => props.$isHome ? 'rgba(255,255,255,0.9)' : '#666'};
  padding: 0;
  text-shadow: ${props => props.$isHome ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'};
  
  &:hover {
    color: ${props => props.$isHome ? 'white' : '#1a1a1a'};
  }
`;

const CartLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  color: ${props => props.$isHome ? 'rgba(255,255,255,0.9)' : '#444'} !important;
  
  &:hover {
    color: ${props => props.$isHome ? 'white' : '#1a1a1a'} !important;
  }
`;

const Badge = styled.span`
  background: ${props => props.$isHome ? 'white' : '#1a1a1a'};
  color: ${props => props.$isHome ? '#1a1a1a' : 'white'};
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 4px;
  font-weight: 700;
`;

const LangButton = styled.button`
  background: rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 10px;
  color: ${props => props.$isHome ? 'white' : '#444'};
  transition: all 0.2s;

  &:hover {
    background: rgba(0,0,0,0.2);
  }
`;

export default function Header() {
  // 사용자 인증, 장바구니 관리, 다국어 처리를 위한 전역 컨텍스트에 접근
  // useContext 훅 사용하고 uselanguage 사용함 
  // t가 영어 변환 함수이
  const { user, setUser } = useContext(UserContext);
  const { cart } = useCart();
  const { t, language, toggleLanguage } = useLanguage();

  // 네비게이션 관련 훅 사용
  const nav = useNavigate();
  const location = useLocation();

  // 현재 페이지가 홈인지 확인하여 헤더 스타일을 조정
  const isHome = location.pathname === '/';

  const onLogout = () => {
    // 사용자 세션을 초기화하고 홈 페이지로 리다이렉트 시키고 
    logout();
    setUser(null);
    nav('/');
  };

  // 장바구니 뱃지에 표시할 총 아이템 수량을 계산, 일반적인 쇼핑몰을 기반으로 만들었지만 백엔드 연동없이 구현하기 위해 ui 상에서 보여지는 것만 구현
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  // 헤더에 떠있는 숫자가 표시간 된다 --> 150번줄로 함수 호출

  return (
    <Bar $isHome={isHome}>
      <Brand to="/" $isHome={isHome}>K-Heritage</Brand>
      <Nav $isHome={isHome}>{/* 네비게이션처럼 링크 다 걸어두기 사실 라우터로 구현 했다가 실패..*/}
        <Link to="/culture">{t('nav', 'culture')}</Link>
        <Link to="/shop">{t('nav', 'shop')}</Link>
        <Link to="/faq">{t('nav', 'faq')}</Link>
        <Link to="/members">{t('nav', 'members')}</Link>

        <CartLink to="/cart" $isHome={isHome}>
          {t('nav', 'cart')}
          {/* 장바구니에 아이템이 있을 때만 뱃지 표시하기, 만약 없을 때는 */}
          {cartCount > 0 && <Badge $isHome={isHome}>{cartCount}</Badge>}
        </CartLink>

        {!user ? (
          <Link to="/login">{t('nav', 'login')}</Link>
        ) : (
          <Button onClick={onLogout} $isHome={isHome}>{t('nav', 'logout')}</Button>
        )}
        {/* 버튼으로 영어 바꾸는 거 두기, 다국어로 하고 싶지만 처음 구현해보는 것으로 다국어는 시실패 */}
        <LangButton onClick={toggleLanguage} $isHome={isHome}>
          {language === 'ko' ? 'EN' : 'KO'}
        </LangButton>
      </Nav>
    </Bar>
  );
}
