import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeaveApplyComponent } from './pages/leave-apply/leave-apply.component';
import { LeaveHistoryComponent } from './pages/leave-history/leave-history.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { LeaveQuotaComponent } from './pages/leave-quota/leave-quota.component';
import { PublicHolidayComponent } from './pages/public-holiday/public-holiday.component';
import { ReportAnalysisComponent } from './pages/report-analysis/report-analysis.component';
import { LogOutComponent } from './pages/log-out/log-out.component';
import { LoginComponent } from './pages/login/login.component';

import { adminGuard, authGuard, hrAdminGuard } from './stores/login/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'leave-apply', component: LeaveApplyComponent },
      { path: 'leave-history', component: LeaveHistoryComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'log-out', component: LogOutComponent },

      // Admin only routes
      { path: 'leave-quota', component: LeaveQuotaComponent, canActivate: [hrAdminGuard] },
      { path: 'public-holiday', component: PublicHolidayComponent, canActivate: [hrAdminGuard] },

      // HR Admin only route (optional if needed)
      { path: 'report-analysis', component: ReportAnalysisComponent, canActivate: [hrAdminGuard] },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
