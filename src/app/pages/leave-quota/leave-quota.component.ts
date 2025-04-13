import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaveQuotaStore } from '../../stores/leave-quota/leave-quota.store';
import { LeaveTypeKey, StaffLeaveQuotaDto } from '../../models/leave-quota/leave-quota-dto.model';


@Component({
  selector: 'app-leave-quota',
  standalone: true,
  templateUrl: './leave-quota.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [LeaveQuotaStore]
})
export class LeaveQuotaComponent {
  private store = inject(LeaveQuotaStore);
  leaveQuota = this.store.leaveQuota;
  leaveTypes = ['children', 'annual', 'sick', 'emergency'] as const;

  tempUpdatedQuota = [] as StaffLeaveQuotaDto[];

  getQuotaValue(staff: StaffLeaveQuotaDto, type: string): number {
    return staff.quotas[type as keyof typeof staff.quotas] ?? 0;
  }

  editQuota = (staffId: number, leaveType: LeaveTypeKey, value: number) => {
    const existing = this.tempUpdatedQuota.find(itme => itme.staffId == staffId);
    if (!existing) {
      const originalData = this.leaveQuota().find(item => item.staffId == staffId);
      if (originalData) {
        this.tempUpdatedQuota.push(originalData);
      }
    }
    const index = this.tempUpdatedQuota.findIndex(item => item.staffId == staffId);
    if (index > -1) {

      this.tempUpdatedQuota[index].quotas[leaveType] = value;
    }
  };

  saveQuota = async (staffId: number) => {
    const updatedItem = this.tempUpdatedQuota.find(item => item.staffId == staffId);
    await this.store.saveQuota(updatedItem!);
  }
}
