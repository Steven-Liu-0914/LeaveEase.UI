import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { LeaveHistoryDto, convertToLeaveHistoryDto } from '../../models/leave-history/leave-history-dto.model';
import { LeaveApplyFormComponent } from '../leave-apply-form/leave-apply-form.component';


@Component({
  standalone: true,
  selector: 'edit-leave-dialog',
  template: `
    <div class="p-4 w-[32rem]">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Edit Leave Application</h2>
      <leave-apply-form
        [form]="data.form"
        [submitLabel]="'Save Changes'"
        (onSubmit)="save()"
      ></leave-apply-form>
    </div>
  `,
  imports: [LeaveApplyFormComponent]
})
export class EditLeaveDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { form: FormGroup },
    private dialogRef: MatDialogRef<EditLeaveDialogComponent>
  ) { }

  save() {
    if (this.data.form.valid) {
      const dto: LeaveHistoryDto = convertToLeaveHistoryDto(this.data.form.getRawValue());
      this.dialogRef.close(dto);
    }
  }
}
