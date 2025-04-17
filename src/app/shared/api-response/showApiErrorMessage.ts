import { Injector, runInInjectionContext, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export function showApiErrorMessage(error: any, injector: Injector) {
  runInInjectionContext(injector, () => {
    const snackBar = inject(MatSnackBar);
    if (error?.error?.message) {
      snackBar.open(error.error.message, '', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['custom-snackbar-error']
      });
    }
  });
}
