import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginDto, LoginInfoResponseDto } from '../../models/login/login-dto.model';
import { ApiResponse, baseUrl } from '../../app.config';

@Injectable({
    providedIn: 'root',
})

export class LoginService {
    readonly #http: HttpClient = inject(HttpClient);

    loginAsync = (
        login: LoginDto,
    ) => {
        return lastValueFrom(this.login(login));
    };

    login = (login: LoginDto) => {
        return this.#http.post<ApiResponse<LoginInfoResponseDto>>(
            `${baseUrl}/login`,
            login,
        );
    };
}