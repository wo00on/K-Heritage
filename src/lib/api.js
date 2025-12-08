// src/lib/api.js
export const API = 'http://localhost:3001';

// 세션 유틸
export function getSession() {
  const raw = localStorage.getItem('session');
  if (raw && raw !== 'undefined') {
    return JSON.parse(raw);
  }
  return null;
}

export function setSession(s) {
  localStorage.setItem('session', JSON.stringify(s));
}

export function logout() {
  localStorage.removeItem('session');
}

