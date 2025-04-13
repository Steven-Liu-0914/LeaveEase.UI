import { inject, Injector } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './login.service';
import { LoginDto } from '../../models/login/login-dto.model';
import { showApiErrorMessage } from '../../shared/api-response/showApiErrorMessage';

export const injectLoginCommand = () => {
    const loginService = inject(LoginService);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (loginDto: LoginDto) => loginService.loginAsync(loginDto),
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};
