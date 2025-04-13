import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (control?.touched && control?.errors) {
      <div class="text-sm text-red-600 mt-1">
  @if (control?.hasError('required')) {
    {{ label }} is required.
  } @else if (control?.hasError('minlength')) {
    {{ label }} must be at least {{ control?.getError('minlength')?.requiredLength }} characters.
  } @else if (control?.hasError('endBeforeStart')) {
    End date must be same or after start date.
  } @else if (control?.hasError('minDate')) {
    {{ label }} cannot be before today.
  } @else {
    Invalid {{ label.toLowerCase() }}.
  }
</div>
    }
  `
})
export class FormErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() label = 'This field';
}
