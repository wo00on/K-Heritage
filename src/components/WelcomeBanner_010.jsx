import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Wrap = styled.div`
  margin: 16px 20px 0;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f1f8ff;
  border: 1px solid #cfe8ff;
  color: #0b5cab;
`;

export default function WelcomeBanner() {
  const { user } = useContext(UserContext);
  if (!user) return null;
  return (
    <Wrap>
      <strong>환영합니다.</strong> {user.name} 님이 로그인하셨습니다.
    </Wrap>
  );
}
