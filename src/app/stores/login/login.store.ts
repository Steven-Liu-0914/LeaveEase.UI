import { inject } from '@angular/core';
import { signalStore, withComputed, withMethods } from '@ngrx/signals';
import { injectLoginForm } from './inject-login-form';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed } from '@angular/core';
import { LoginInfoResponseDto } from '../../models/login/login-dto.model';

export const LoginStore = signalStore(
    { providedIn: 'root', protectedState: false },

    withComputed(() => {
        const form = injectLoginForm();
        const formValue = toSignal(form.valueChanges, { initialValue: form.value });
        const formStatus = toSignal(form.statusChanges, { initialValue: form.status });

        const isFormInValid = computed(() =>
            formStatus() === 'INVALID' && (form.touched || form.dirty)
        );

        return {
            form: computed(() => form),
            formValue,
            formStatus,
            isFormInValid,
        };
    }),

    withMethods(() => {
        const storeLoginInfo = (user: LoginInfoResponseDto) => {
            localStorage.setItem('loginInfo', JSON.stringify(user));
        };

        const restoreLoginInfo = () => {
            const stored = localStorage.getItem('loginInfo');
            return stored ? (JSON.parse(stored) as LoginInfoResponseDto) : null;
        };

        const clearLoginInfo = () => {
            localStorage.removeItem('loginInfo');
        };

        return {
            storeLoginInfo,
            restoreLoginInfo,
            clearLoginInfo
        };
    })
);
