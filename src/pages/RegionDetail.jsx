import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../lib/api';

const Hero = styled.div`
  position:relative; height:280px; margin:16px 20px; border-radius:16px; overflow:hidden; background:#eee;
`;
const Title = styled.h2` margin:0; padding:16px 20px; `;

/* 상단 우측에 홈 버튼 배치 */
const TopBar = styled.div`
  padding:0 20px; margin:8px 0 16px;
  display:flex; align-items:center; justify-content:flex-end; gap:12px;
`;
const HomeBtn = styled.button`
  padding:10px 14px; border:0; border-radius:12px; cursor:pointer;
  background:#ff385c; color:#fff; font-weight:600; box-shadow:0 6px 16px rgba(0,0,0,.08);
`;

const Grid = styled.div`
  padding:0 20px 40px; display:grid; gap:16px;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
`;
const Card = styled.div` background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,.08); `;
const Body = styled.div` padding:12px 14px; color:#666; `;

export default function RegionDetail() {
  const { regionId } = useParams();
  const nav = useNavigate();
  const [region, setRegion] = useState(null);
  const [spots, setSpots] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    (async () => {
      try {
        setLoading(true);
        setErr('');

        // /regions/:id 로 시도
        let r = await fetch(`${API}/regions/${regionId}`);
        let reg = r.ok ? await r.json() : null;
        if (Array.isArray(reg)) reg = reg[0] || null;

        // 없으면 /regions?id= 로 재시도
        if (!reg) {
          const r2 = await fetch(`${API}/regions?id=${encodeURIComponent(regionId)}`);
          const arr = await r2.json();
          reg = arr[0] || null;
        }
        if (!reg) throw new Error('지역 정보를 찾을 수 없습니다.');

        setRegion(reg);

        const a = await fetch(`${API}/attractions?regionId=${encodeURIComponent(regionId)}`);
        setSpots(await a.json());
      } catch (e) {
        setErr(e.message || '로딩 실패');
      } finally {
        setLoading(false);
      }
    })();
  }, [regionId]);

  if (loading) return <p style={{padding:'0 20px'}}>로딩 중…</p>;
  if (err)     return <p style={{padding:'0 20px', color:'crimson'}}>오류: {err}</p>;

  return (
    <div>
      <Title>{region?.name}</Title>
      <Hero>{region?.cover && <img src={region.cover} alt={region.name} />}</Hero>

      {/* 홈 버튼 */}
      <TopBar>
        <HomeBtn onClick={() => nav('/')}>홈으로 가기</HomeBtn>
      </TopBar>

      <Grid>
        {spots.map(s => (
          <Card key={s.id}>
            <div style={{height:180, background:'#eee'}}>
              {s.image && <img src={s.image} alt={s.name} />}
            </div>
            <Body>
              <strong style={{display:'block', color:'#111', marginBottom:6}}>{s.name}</strong>
              <span>{s.desc}</span>
            </Body>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
