import { LoginInfoResponseDto } from '../../models/login/login-dto.model';

const key = 'loginInfo';

export function getLoginInfo(): LoginInfoResponseDto | null {
    const raw = localStorage.getItem(key);
    try {
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function isLoggedIn(): boolean {

    console.log('isLoggedIn', getLoginInfo());
    return !!getLoginInfo();
}

export function isAdmin(): boolean {
    const info = getLoginInfo();
    return info?.role === 'admin';
}

export function isHrAdmin(): boolean {
    const info = getLoginInfo();
    return info?.role === 'admin' && info?.department === 'Human Resources';
}

export function getDepartment(): string | null {
    return getLoginInfo()?.department ?? null;
}

export function clearLoginInfo() {
    localStorage.removeItem(key);
}
