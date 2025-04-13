import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'leave-apply-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './leave-apply-form.component.html'
})
export class LeaveApplyFormComponent {
  @Input() form!: FormGroup;
  @Input() submitLabel = 'Submit Leave Application';
  @Output() onSubmit = new EventEmitter<void>();

  isFormInValid = () => this.form?.invalid;
  today = new Date();
}
