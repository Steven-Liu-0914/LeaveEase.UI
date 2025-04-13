import { LoginInfoResponseDto } from '../../models/login/login-dto.model';

const key = 'loginInfo';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function getLoginInfo(): LoginInfoResponseDto | null {
  if (!isBrowser()) return null;

  const raw = localStorage.getItem(key);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  if (!isBrowser()) return false;

  return !!getLoginInfo();
}

export function isAdmin(): boolean {
  if (!isBrowser()) return false;

  const info = getLoginInfo();
  return info?.role === 'admin';
}

export function isHrAdmin(): boolean {
  if (!isBrowser()) return false;

  const info = getLoginInfo();
  return info?.role === 'admin' && info?.department === 'Human Resources';
}

export function getDepartment(): string | null {
  if (!isBrowser()) return null;

  return getLoginInfo()?.department ?? null;
}

export function clearLoginInfo() {
  if (!isBrowser()) return;

  localStorage.removeItem(key);
}
