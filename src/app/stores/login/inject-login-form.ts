import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const injectLoginForm = () => {

    const fb = inject(FormBuilder)

    const loginForm = fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]], // Username field with validation
        password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validation
    });

    return loginForm;
}