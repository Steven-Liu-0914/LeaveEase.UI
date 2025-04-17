import { runInInjectionContext, inject, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export function showSuccessMessage(message: string, injector: Injector) {

    runInInjectionContext(injector, () => {
        const snackBar = inject(MatSnackBar);
        snackBar.open(message, '', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-success'],
        });
    });

}
