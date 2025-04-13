import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isAdmin, isHrAdmin, isLoggedIn } from './auth-helper';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);

    if (!isLoggedIn()) {
        router.navigate(['/login']);
        return false;
    }

    return true;
};


export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);

    if (!isAdmin()) {
        router.navigate(['/dashboard']);
        return false;
    }

    return true;
};


export const hrAdminGuard: CanActivateFn = () => {
    const router = inject(Router);

    if (!isHrAdmin()) {
        router.navigate(['/dashboard']);
        return false;
    }

    return true;
};
