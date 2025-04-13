import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export function injectAddHolidayForm() {
    const fb = inject(FormBuilder);
    return fb.group({
        name: ['', Validators.required],
        date: ['', Validators.required]
    });
}
