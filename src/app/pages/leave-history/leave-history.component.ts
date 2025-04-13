import { Component, computed, inject } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { NgIf, NgFor } from '@angular/common';
import { LeaveHistoryStore } from '../../stores/leave-history/leave-history.store';
import { convertToLeaveHistoryDto, LeaveHistoryDto } from '../../models/leave-history/leave-history-dto.model';
import { LeaveApplyFormComponent } from '../../shared/leave-apply-form/leave-apply-form.component';
import { injectLeaveApplyForm } from '../../stores/leave-apply/inject-leave-apply-form';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { EditLeaveDialogComponent } from '../../shared/edit-leave-dialog/edit-leave-dialog.component';
import { isAfter, parseISO } from 'date-fns';
import { minDateValidator, endDateAfterOrEqualStartDate } from '../../shared/form-error/date-range.validatior';

@Component({
  standalone: true,
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  providers: [LeaveHistoryStore],
  imports: [
    MatTableModule,
    MatDialogModule,
  ]
})
export class LeaveHistoryComponent {
  private store = inject(LeaveHistoryStore);

  leaveHistory = this.store.leaveHistory;
  columnsToDisplay = ['leaveType', 'startDate', 'endDate', 'reason', 'status', 'actions'];
  dialog = inject(MatDialog);

  confirmCancel(row: LeaveHistoryDto) {
    const confirmDelete = confirm(`Are you sure you want to cancel leave from ${row.startDate} to ${row.endDate}?`);
    if (confirmDelete) {
      this.store.cancelLeave(row);
    }
  }
  fb = inject(FormBuilder);

  editLeave(row: LeaveHistoryDto) {
    const form = this.fb.group(
      {
        leaveApplicationId: [row.leaveApplicationId ?? ''],
        leaveType: [row.leaveType ?? '', Validators.required],
        startDate: [row.startDate ?? '', [Validators.required, minDateValidator()]],
        endDate: [row.endDate ?? '', Validators.required],
        reason: [row.reason ?? '', [Validators.required, Validators.minLength(10)]],
        status: [row.status ?? 'Pending']
      },
      {
        validators: endDateAfterOrEqualStartDate
      }
    );

    const dialogRef = this.dialog.open(EditLeaveDialogComponent, {
      width: '36rem',
      data: { form }
    });

    dialogRef.afterClosed().subscribe((result: LeaveHistoryDto) => {
      console.log(result);
      if (result) {
        this.store.updateLeave(result);
      }
    });
  }

  canCancelLeave(status: string, startDate: string): boolean {
    const today = new Date();
    if (status.toLowerCase() === 'pending') {
      return true;
    }
    if (status.toLowerCase() === 'approved' && isAfter(parseISO(startDate), today)) {
      return true;
    }
    return false;
  }
}
