import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject } from '@angular/core';


export function injectPublicHolidayForm(row: any): FormGroup {
    const fb = inject(FormBuilder);
    return fb.group({
        id: [row.id],
        name: [row.name, Validators.required],
        date: [row.date, Validators.required],
        day: [row.day] // auto-generated
    });
}
