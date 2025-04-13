import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStore } from '../../stores/login/login.store';


@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-out.component.html'
})
export class LogOutComponent {
  loginStore = inject(LoginStore);

  constructor() {
    this.loginStore.clearLoginInfo(); // ✅ clear on load
  }
}
