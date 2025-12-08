import { useState, useContext } from 'react';
import styled from 'styled-components';
import { API, setSession } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/gyeongbok.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const AuthCard = styled.form`
  background: #ffffff;
  width: 100%;
  max-width: 420px;
  padding: 60px 40px;
  box-shadow: 0 0 40px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin: 0 0 40px;
  font-family: 'Noto Serif KR', serif;
  font-size: 2.2rem;
  color: #1a1a1a;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
  
  label {
    display: block;
    margin-bottom: 10px;
    font-size: 0.85rem;
    color: #666;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: #fcfcfc;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    background: #fff;
  }
  
  &::placeholder {
    color: #ccc;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 18px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const ErrorMsg = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
`;

const SignupLink = styled.div`
  margin-top: 30px;
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
  
  a {
    color: #888;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;
    
    &:hover {
      color: #1a1a1a;
    }
  }
`;

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();
  const { setUser } = useContext(UserContext);
  const { t } = useLanguage();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    // 관리자 기본 로그인
    if (userId === 'admin' && password === '1234') {
      const adminUser = { userId: 'admin', name: '관리자', role: 'admin' };
      setSession(adminUser);
      setUser(adminUser);
      nav('/');
      return;
    }

    // 회원 로그인(JSON Server)
    const rows = await fetch(
      `${API}/users?userId=${encodeURIComponent(userId)}&password=${encodeURIComponent(password)}`
    ).then(r => r.json());

    const user = rows[0];
    if (!user) {
      setMsg(t('login', 'error'));
      return;
    }

    const sessionUser = { userId: user.userId, name: user.name, role: 'user' };
    setSession(sessionUser);
    setUser(sessionUser);
    nav('/');
  };

  return (
    <PageContainer>
      <AuthCard onSubmit={onSubmit}>
        <Title>{t('login', 'title')}</Title>

        <InputGroup>
          <label>{t('login', 'id')}</label>
          <StyledInput
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="ID"
          />
        </InputGroup>

        <InputGroup>
          <label>{t('login', 'password')}</label>
          <StyledInput
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="PASSWORD"
          />
        </InputGroup>

        <SubmitBtn type="submit">{t('login', 'submit')}</SubmitBtn>

        <SignupLink>
          <Link to="/signup">
            {t('login', 'signupLink')}
          </Link>
        </SignupLink>

        {msg && <ErrorMsg>{msg}</ErrorMsg>}
      </AuthCard>
    </PageContainer>
  );
}
