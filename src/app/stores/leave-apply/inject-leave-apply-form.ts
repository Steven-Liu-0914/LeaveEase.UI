import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { endDateAfterOrEqualStartDate, minDateValidator } from '../../shared/form-error/date-range.validatior';


export function injectLeaveApplyForm() {
  const fb = inject(FormBuilder);
  return fb.group(
    {
      leaveType: ['', Validators.required],
      startDate: ['', [Validators.required, minDateValidator()]],
      endDate: ['', [Validators.required, minDateValidator()]],
      reason: ['', [Validators.required, Validators.minLength(10)]],
    },
    { validators: endDateAfterOrEqualStartDate }
  );
}
