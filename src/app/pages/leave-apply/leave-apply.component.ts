import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { LeaveApplyStore } from '../../stores/leave-apply/leave-apply.store';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
import { LeaveApplyFormComponent } from '../../shared/leave-apply-form/leave-apply-form.component';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  providers: [LeaveApplyStore],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    LeaveApplyFormComponent
  ]
})

export class LeaveApplyComponent {
  private store = inject(LeaveApplyStore);
  form = this.store.form();
  async submitLeaveApplication() {
    await this.store.submitLeave();
  }
}
