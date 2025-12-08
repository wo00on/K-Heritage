import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API } from '../lib/api';

const Wrap = styled.div`max-width:960px;margin:24px auto;padding:0 20px;`;
const Head = styled.div`display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;`;
const Input = styled.input`padding:8px 10px;border:1px solid #ddd;border-radius:10px;`;
const Table = styled.table`
  width:100%; background:#fff; border-radius:16px; box-shadow:0 8px 24px rgba(0,0,0,.08);
  border-collapse:collapse; overflow:hidden;
  th,td{ padding:12px 14px; border-bottom:1px solid #eee; text-align:left; }
  th{ background:#fafafa; font-weight:700; }
`;

export default function Members(){
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetch(`${API}/users`).then(r => r.json());
        // admin 제외
        setRows((data || []).filter(u => u.userId !== 'admin'));
      } catch (e) {
        setErr('회원 목록을 불러오지 못했습니다.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = rows.filter(u => {
    const key = (u.name + u.userId + (u.phone||'') + (u.interests||[]).join(',')).toLowerCase();
    return key.includes(q.toLowerCase());
  });

  if (loading) return <Wrap>불러오는 중…</Wrap>;
  if (err) return <Wrap style={{color:'crimson'}}>{err}</Wrap>;

  return (
    <Wrap>
      <Head>
        <h2 style={{margin:0}}>회원 목록</h2>
        <Input
          placeholder="이름/ID/전화/관심지역 검색…"
          value={q}
          onChange={e=>setQ(e.target.value)}
        />
      </Head>
      <Table>
        <thead>
          <tr>
            <th>이름</th>
            <th>ID</th>
            <th>전화</th>
            <th>관심 지역</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.userId}</td>
              <td>{u.phone}</td>
              <td>{(u.interests || []).join(', ')}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="4" style={{color:'#888', padding:'18px 14px'}}>
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Wrap>
  );
}
