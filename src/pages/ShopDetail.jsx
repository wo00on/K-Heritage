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
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API}/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
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
        <Price>{product.price.toLocaleString()}won</Price>

        <Button onClick={handleAddToCart}>{t('shop', 'addToCart')}</Button>
      </InfoSection>
    </Container>
  );
}
