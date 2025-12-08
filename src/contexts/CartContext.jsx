import React, { createContext, useContext, useState, useEffect } from 'react';

// Context 생성: 앱 전역에서 장바구니 데이터를 공유하기 위한 저장소.
const CartContext = createContext();

// Custom Hook: Context를 더 쉽게 사용하기 위한 래퍼(Wrapper) 함수
// 컴포넌트에서 useContext(CartContext)를 매번 쓰는 대신 useCart()로 직관적인 접근이 가능.
export function useCart() {
    return useContext(CartContext);
}

export default function CartProvider({ children }) {
    // 1. State Lazy Initialization (지연 초기화) 패턴
    // useState에 초기값으로 함수를 전달하면, 컴포넌트가 처음 렌더링될 때만 해당 함수가 실행.
    // localStorage 접근은 비용이 큰 I/O 작업이므로, 매 렌더링마다 실행되지 않도록 최적화.
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        // 저장된 데이터가 있다면 파싱해서 사용하고, 없다면 빈 배열로 초기화.
        return saved ? JSON.parse(saved) : [];
    });

    // 2. Data Persistence (데이터 영속성)
    // cart 상태가 변경될 때마다(의존성 배열 [cart]), 변경된 값을 localStorage에 동기화.
    // 이를 통해 사용자가 새로고침하거나 브라우저를 껐다 켜도 장바구니 데이터가 유지.
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // 상품 추가 로직: 불변성(Immutability) 유지가 핵심
    const addToCart = (product) => {
        setCart(prev => {
            // 이미 장바구니에 있는지 확인 (중복 체크)
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // 이미 존재한다면 map을 사용해 새로운 배열을 반환하며 수량만 1 증가시.
                // 기존 객체를 직접 수정하지 않고 Spread Operator(...)를 써서 복사본을 만드는 것이 React 상태 관리의 정석.
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // 새로운 상품이라면 기존 배열 뒤에 새 객체를 추가. (기본 수량 1)
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // 상품 삭제 로직
    // filter 함수는 조건을 만족하는 요소만 모아 '새로운 배열'을 반환하므로, 자연스럽게 불변성 유지.
    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    // 수량 업데이트 로직
    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                // 수량은 최소 1개 이상이어야 하므로 Math.max를 사용하여 방어 로직을 작성.
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    // 장바구니 비우기 (결제 완료 후 등에 사용)
    const clearCart = () => setCart([]);

    // Context Provider를 통해 앱 전역으로 상태와 조작 함수들을 노출.
    // value 객체 안에 담긴 데이터는 하위의 모든 컴포넌트에서 useCart() 훅을 통해 접근 가능.
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
