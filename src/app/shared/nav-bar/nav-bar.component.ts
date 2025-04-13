import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginStore } from '../../stores/login/login.store';
import { isAdmin, isHrAdmin, isLoggedIn } from '../../stores/login/auth-helper';
import { LoginInfoResponseDto } from '../../models/login/login-dto.model';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})



export class NavBarComponent implements OnInit {
  loginInfo: string | null = null;
  loginStore = inject(LoginStore);

  _isLoggedIn = isLoggedIn();
  _isAdmin = isAdmin();
  _isHRAdmin = isHrAdmin();

  userName = computed(() => {
    if (this.loginInfo) {
      const login = JSON.parse(this.loginInfo) as LoginInfoResponseDto;
      return login.fullName;
    }

    return null;
  })
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.loginInfo = localStorage.getItem('loginInfo');
    }
  }
} 
