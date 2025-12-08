import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { logout } from '../lib/api';
import { UserContext } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { user, setUser } = useContext(UserContext);
  const { cart } = useCart();
  const { t, language, toggleLanguage } = useLanguage();
  const nav = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const onLogout = () => {
    logout();
    setUser(null);
    nav('/');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Bar $isHome={isHome}>
      <Brand to="/" $isHome={isHome}>K-Heritage</Brand>
      <Nav $isHome={isHome}>
        <Link to="/culture">{t('nav', 'culture')}</Link>
        <Link to="/shop">{t('nav', 'shop')}</Link>
        <Link to="/faq">{t('nav', 'faq')}</Link>
        <Link to="/members">{t('nav', 'members')}</Link>

        <CartLink to="/cart" $isHome={isHome}>
          {t('nav', 'cart')}
          {cartCount > 0 && <Badge $isHome={isHome}>{cartCount}</Badge>}
        </CartLink>

        {!user ? (
          <Link to="/login">{t('nav', 'login')}</Link>
        ) : (
          <Button onClick={onLogout} $isHome={isHome}>{t('nav', 'logout')}</Button>
        )}
        <LangButton onClick={toggleLanguage} $isHome={isHome}>
          {language === 'ko' ? 'EN' : 'KO'}
        </LangButton>
      </Nav>
    </Bar>
  );
}
