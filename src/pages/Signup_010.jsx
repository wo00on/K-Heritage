import { useState } from 'react';
import styled from 'styled-components';
import { API } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext'; // 영어 지원을 위함

// ---------- 스타일링 시작 ----------
// 배경에 경복궁 이미지를 깔아서 한국적인 느낌 물씬 나게 함
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // 배경 이미지 어둡게 처리해서 흰색 폼이 잘 보이도록 조정함
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/gyeongbok.jpg');
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
`;

// 회원가입 폼 카드 스타일
const AuthCard = styled.form`
  background: #ffffff;
  width: 100%;
  max-width: 500px; // 너무 넓으면 안예쁨
  padding: 60px 40px;
  box-shadow: 0 0 40px rgba(0,0,0,0.5); // 그림자 빡세게 줌
  border: 1px solid rgba(255,255,255,0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin: 0 0 40px;
  font-family: 'Noto Serif KR', serif; // 궁서체 느낌 폰트
  font-size: 2.2rem;
  color: #1a1a1a;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

// 입력 필드 그룹 감싸는 녀석
const InputGroup = styled.div`
  margin-bottom: 24px;
  
  label {
    display: block; // 라벨은 한 줄 다 차지하게
    margin-bottom: 10px;
    font-size: 0.85rem;
    color: #666;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

// 인풋 스타일 - 테두리 둥글게 할까 하다 각지게 함
const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 0; // 각진 스타일 유지
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: #fcfcfc;

  &:focus {
    outline: none; // 기본 아웃라인 못생겨서 뺌
    border-color: #1a1a1a;
    background: #fff;
  }
`;

// 가입 버튼 스타일
const SubmitBtn = styled.button`
  width: 100%;
  padding: 18px;
  background: #1a1a1a; // 검정색이 제일 무난함
  color: white;
  border: none;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #333; // 호버시 살짝 밝게
    transform: translateY(-2px); // 살짝 떠오르는 효과 굿
  }
`;

// 체크박스 그룹용 스타일
const CheckboxGroup = styled.div`
  margin-bottom: 24px;
  
  label.group-label {
    display: block;
    margin-bottom: 12px;
    font-size: 0.85rem;
    color: #666;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

// 라디오 버튼 그룹 (가로 배치)
const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 10px;
  
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    cursor: pointer;
    font-weight: 400;
    color: #333;
    text-transform: none;
  }
  
  input {
    accent-color: #1a1a1a; // 체크 색상 변경
    width: 18px;
    height: 18px;
  }
`;

// 관심사 선택 부분 스타일
const InterestOptions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap; // 공간 부족하면 줄바꿈
`;

const InterestLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;
  padding: 8px 12px;
  border: 1px solid #eee;
  transition: all 0.2s;
  
  &:hover {
    background: #f9f9f9;
    border-color: #ddd;
  }
  
  input {
    accent-color: #1a1a1a;
    width: 16px;
    height: 16px;
  }
`;

// 성공/실패 메시지 보여주는 곳
const Message = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  // 성공이면 초록색, 실패면 빨간색
  color: ${props => props.$success ? '#27ae60' : '#e74c3c'};
`;

// 하드코딩된 관심사 목록 (나중에 DB에서 가져와야 할수도?)
const INTERESTS = ['경복궁', '창덕궁', '창경궁', '덕수궁', '경희궁'];

// ---------- 컴포넌트 시작 ----------
export default function Signup() {
  const { t } = useLanguage(); // 다국어 hook
  const nav = useNavigate();

  // 폼 상태 관리.. 필드가 너무 많다 ㅜㅜ 줄일 방법 없나?
  const [form, setForm] = useState({
    userId: '',
    password: '',
    confirm: '',
    name: '',
    phone: '',
    gender: 'male', // 기본값 남성
    interests: [], // 복수 선택 가능
    country: '',
    status: 'local' // 내국인 기본
  });

  const [msg, setMsg] = useState(''); // 에러 메시지용

  // 관심사 토글 함수 (체크/해제)
  const toggleInterest = (area) => {
    const current = form.interests;
    if (current.includes(area)) {
      setForm({ ...form, interests: current.filter(a => a !== area) }); // 있으면 빼고
    } else {
      setForm({ ...form, interests: [...current, area] }); // 없으면 넣고
    }
  };

  // 폼 제출 처리
  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); // 메시지 초기화

    // 1. 빈 값 체크 (필수 항목 다 있는지)
    if (!form.name || !form.userId || !form.password || !form.phone) {
      setMsg(t('signup', 'required'));
      return;
    }

    // 2. 비밀번호 확인 체크
    if (form.password !== form.confirm) {
      setMsg(t('signup', 'mismatch'));
      return;
    }

    // 3. 중복 아이디 체크 (API 호출)
    // 원래는 백엔드에서 에러 뱉어야 하는데 json-server라서 이렇게 함
    const exists = await fetch(`${API}/users?userId=${form.userId}`).then(r => r.json());
    if (exists.length > 0) {
      setMsg(t('signup', 'exists'));
      return;
    }

    // 4. 회원가입 API 호출 (POST)
    await fetch(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    // 성공! 로그인 페이지로 쫓아냄
    alert(t('signup', 'success'));
    nav('/login');
  };

  return (
    <PageContainer>
      <AuthCard onSubmit={onSubmit}>
        <Title>{t('signup', 'title')}</Title>

        {/* 아이디 입력 */}
        <InputGroup>
          <label>ID</label>
          <StyledInput
            value={form.userId}
            onChange={e => setForm({ ...form, userId: e.target.value })}
          />
        </InputGroup>

        {/* 이름 입력 */}
        <InputGroup>
          <label>{t('signup', 'name')}</label>
          <StyledInput
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </InputGroup>

        {/* 비번 입력 */}
        <InputGroup>
          <label>{t('signup', 'password')}</label>
          <StyledInput
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </InputGroup>

        {/* 비번 확인 */}
        <InputGroup>
          <label>{t('signup', 'confirm')}</label>
          <StyledInput
            type="password"
            value={form.confirm}
            onChange={e => setForm({ ...form, confirm: e.target.value })}
          />
        </InputGroup>

        {/* 전화번호 */}
        <InputGroup>
          <label>{t('signup', 'phone')}</label>
          <StyledInput
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="010-1234-5678" // 예시 보여주기
          />
        </InputGroup>

        {/* 성별 선택 (라디오 버튼) */}
        <InputGroup>
          <label>{t('signup', 'gender')}</label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === 'male'}
                onChange={e => setForm({ ...form, gender: e.target.value })}
              />
              {t('signup', 'male')}
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === 'female'}
                onChange={e => setForm({ ...form, gender: e.target.value })}
              />
              {t('signup', 'female')}
            </label>
          </RadioGroup>
        </InputGroup>

        {/* 내국인/외국인 여부 */}
        <InputGroup>
          <label>{t('signup', 'status')}</label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="status"
                value="local"
                checked={form.status === 'local'}
                onChange={e => setForm({ ...form, status: e.target.value })}
              />
              {t('signup', 'local')}
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="foreigner"
                checked={form.status === 'foreigner'}
                onChange={e => setForm({ ...form, status: e.target.value })}
              />
              {t('signup', 'foreigner')}
            </label>
          </RadioGroup>
        </InputGroup>

        {/* 국가 입력 (사실 내국인은 필요없는데..) */}
        <InputGroup>
          <label>{t('signup', 'country')}</label>
          <StyledInput
            value={form.country}
            onChange={e => setForm({ ...form, country: e.target.value })}
            placeholder={t('signup', 'placeholderCountry')}
          />
        </InputGroup>

        {/* 관심 궁궐 선택 (체크박스) */}
        <CheckboxGroup>
          <label className="group-label">{t('signup', 'interests')}</label>
          <InterestOptions>
            {INTERESTS.map(area => (
              <InterestLabel key={area}>
                <input
                  type="checkbox"
                  checked={form.interests.includes(area)}
                  onChange={() => toggleInterest(area)}
                />
                {area}
              </InterestLabel>
            ))}
          </InterestOptions>
        </CheckboxGroup>

        {/* 진짜 가입 버튼 */}
        <SubmitBtn type="submit">{t('signup', 'submit')}</SubmitBtn>

        {/* 혹시 아이디 있으면 로그인하러 가라고 */}
        <div style={{ marginTop: 30, textAlign: 'center', paddingTop: 20, borderTop: '1px solid #eee' }}>
          <Link to="/login" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>
            {t('signup', 'loginLink')}
          </Link>
        </div>

        {/* 에러나 성공 메시지 띄워주는 곳 */}
        {msg && <Message $success={msg.includes('완료') || msg.includes('complete')}>{msg}</Message>}
      </AuthCard>
    </PageContainer>
  );
}
