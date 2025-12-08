import { createContext, useState, useEffect } from 'react';
import { getSession } from '../lib/api';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(getSession());

  // localStorage 변경 감지
  useEffect(() => {
    const onStorage = () => setUser(getSession());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
