import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { injectAddHolidayForm } from '../../stores/public-holiday/inject-add-holiday-form';
import { FormErrorComponent } from '../form-error/form-error.component';


@Component({
  selector: 'app-add-holiday-dialog',
  standalone: true,
  templateUrl: './add-holiday-dialog.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent]
})
export class AddHolidayDialogComponent {
  dialogRef = inject(MatDialogRef<AddHolidayDialogComponent>);
  form = injectAddHolidayForm();

  get isFormInValid() {
    return this.form.invalid && (this.form.dirty || this.form.touched);
  }

  submit() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      this.dialogRef.close(formValue); // send data back to parent
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
