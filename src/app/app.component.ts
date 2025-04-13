import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { LoginStore } from './stores/login/login.store';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  isLoginPage: boolean = false;
  title = 'leaveEase';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Check if the current route is login or logout
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isLoginPage = currentRoute.includes('login') || currentRoute.includes('log-out');
    });
  }
}
