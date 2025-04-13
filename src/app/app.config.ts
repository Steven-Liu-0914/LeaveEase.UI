import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Use provideAnimations
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideQueryClient, QueryClient } from '@tanstack/angular-query-experimental';
import { provideHttpClient } from '@angular/common/http';
import { LoginInfoResponseDto } from './models/login/login-dto.model';

export const queryClient = new QueryClient();

export const baseUrl = 'http://localhost:8080/api';

export interface ApiResponse<T> {
  data: T;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNativeDateAdapter(),
    provideAnimations(), // ✅ Correct way to provide animations
    { provide: DateAdapter, useFactory: adapterFactory }, // ✅ Correct way to provide DateAdapter
    provideHttpClient(),
    provideQueryClient(queryClient),
  ],
};

export const getLoginStaffId = () => {
  const loginInfo = localStorage.getItem('loginInfo');
  if (loginInfo) {
    const login = JSON.parse(loginInfo) as LoginInfoResponseDto;
    return login.staffId;
  }
  return null;
}
