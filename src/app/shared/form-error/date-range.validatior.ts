import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function endDateAfterOrEqualStartDate(control: AbstractControl): ValidationErrors | null {
    const start = control.get('startDate')?.value;
    const end = control.get('endDate')?.value;

    if (!start || !end) return null;

    return new Date(end) < new Date(start)
        ? { endBeforeStart: true }
        : null;
}

export function minDateValidator(minDate: Date = new Date()): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const selected = new Date(control.value);
        selected.setHours(0, 0, 0, 0); // Clear time
        minDate.setHours(0, 0, 0, 0);

        return selected >= minDate ? null : { minDate: true };
    };
}

