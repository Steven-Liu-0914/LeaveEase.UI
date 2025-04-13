import { FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';

export function injectUserProfileForm() {
  const fb = inject(FormBuilder);
  return fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    department: ['', Validators.required],
    jobTitle: ['', Validators.required]
  });
}
