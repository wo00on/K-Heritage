import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 스타일 관련: 전역 스타일 초기화용 (css 기능 포함되어 있음)
import GlobalStyle from './styles/GlobalStyle';

// 공통 레이아웃 컴포넌트: 헤더와 푸터는 페이지 이동해도 유지되어야 한다!
import Header from './components/Header_010';
import Footer from './components/Footer_010';

// 메인 및 회원 관련 페이지
import Home from './pages/Home_010';
import Login from './pages/Login_010';
import Signup from './pages/Signup_010';
import Members from './pages/Members'; // 만약 관리자가 본다면 관리자 페이지 용도로 사용

// 문화유산 소개 관련 페이지(5개의 궁만 소개, 추후 더 다른 문화재를 추가로 발전 해야함)
import HeritageList from './pages/HeritageList';
import HeritageDetail from './pages/HeritageDetail';

// 쇼핑몰 관련 페이지 (굿즈샵-추후에 사업화를 염두하고 개발 진행해야함)
import ShopList from './pages/ShopList';
import ShopDetail from './pages/ShopDetail';
import Cart from './pages/Cart_010';
import FAQ from './pages/FAQ_010';

// 전역 상태 관리 (Context API), 영어변환 하드코딩 그래서 전체적으로 감쌈
// Provider 중첩 순서 신경써야 함! (Language -> User -> Cart 순서로 감쌈)
import UserProvider from './contexts/UserContext';
import CartProvider from './contexts/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    /* 
       Context Provider 세팅
       1. LanguageProvider: 영어ㅓ 지원이 제일 기본이라 가장 밖에 둠
       2. CartProvider: 장바구니 기능 (나중에 유저 정보 연동될 수 있으니 User 안쪽에 배치)
    */
    <LanguageProvider>
      <UserProvider>
        <CartProvider>
          {/* 전체 앱에 공통 스타일 적용 */}
          <GlobalStyle />

          {/* 헤더: 네비게이션바 (항상 상단 고정) */}
          <Header />

          {/* URL에 따라 실제 컨텐츠가 바뀌는 부분 */}
          <Routes>
            {/* 메인 홈 */}
            <Route path="/" element={<Home />} />

            {/* 문화유산 알려주는 부분 */}
            <Route path="/culture" element={<HeritageList />} />
            {/* :id로 동적 라우팅 처리해서 상세 페이지 보여줌 */}
            <Route path="/culture/:id" element={<HeritageDetail />} />

            {/* 굿즈, 굿즈샵 관련 페이지 */}
            {/* TODO: 가끔 페이지 전환될 때 끊기는 느낌 있는데 나중에 최적화 확인 필요 */}
            {/* TODO: 가끔 페이지 전환될 때 끊기는 느낌 있는데 나중에 최적화 확인 필요 */}

            <Route path="/shop" element={<ShopList />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/cart" element={<Cart />} />

            {/* 회원, 회원가입, 로그인 페이지 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Members" element={<Members />} />

            {/* 문의사항 페이지 구현 */}
            <Route path="/faq" element={<FAQ />} />


          </Routes>

          {/* 푸터: 사이트 정보 등 (항상 하단 고정) */}
          <Footer />
        </CartProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
