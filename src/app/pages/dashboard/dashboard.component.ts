import { Component, computed, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DashboardStore } from '../../stores/dashboard/dashboard.store';
import { injectDashboardQuery } from '../../api/dashboard/dashboard.query';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [CommonModule],
  providers: [DashboardStore]
})
export class DashboardComponent {
  private store = inject(DashboardStore);
  summary = this.store.summary;
  nextUpcomingLeave = this.store.nextUpcomingLeave;
  pendingApprovals = computed(() => {
    return this.store.pendingApprovals();
  })

  confirmApprove(id: number) {
    if (confirm('Are you sure you want to approve this leave?')) {
      this.store.approveLeave(id);
    }
  }

  confirmReject(id: number) {
    if (confirm('Are you sure you want to reject this leave?')) {
      this.store.rejectLeave(id);
    }
  }
}
