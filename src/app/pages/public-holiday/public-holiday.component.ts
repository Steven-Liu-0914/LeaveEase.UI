import { Component, computed, effect, inject, Injector, OnInit, runInInjectionContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { injectPublicHolidayForm } from '../../stores/public-holiday/inject-public-holiday-form';
import { PublicHolidayStore } from '../../stores/public-holiday/public-holiday.store';
import { MatDialog } from '@angular/material/dialog';
import { AddHolidayDialogComponent } from '../../shared/add-holiday-dialog/add-holiday-dialog.component';
import { format, parseISO } from 'date-fns';
import { PublicHolidayDto } from '../../models/public-holiday/public-holiday.model';

@Component({
  selector: 'app-public-holiday',
  standalone: true,
  templateUrl: './public-holiday.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [PublicHolidayStore]
})
export class PublicHolidayComponent implements OnInit {
  private store = inject(PublicHolidayStore);
  private fb = inject(FormBuilder);

  private injector = inject(Injector);
  holidays = computed(() => this.store.holiday());
  updateHoliday = this.store.updateHoliday;
  deleteHoliday = this.store.deleteHoliday;
  exportToExcel = this.store.exportToExcel;

  formArray = computed(() => {
    return this.fb.array(
      this.holidays().map(holiday =>
        runInInjectionContext(this.injector, () => injectPublicHolidayForm(holiday))
      )
    );
  });

  formGroup = this.fb.group({
    holidays: this.buildHolidayFormArray(this.store.holiday()),
  });

  buildHolidayFormArray(holidays: PublicHolidayDto[]): FormArray {
    return this.fb.array(
      holidays.map(h =>
        runInInjectionContext(this.injector, () => injectPublicHolidayForm(h))
      )
    );
  }

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const array = this.formGroup.get('holidays') as FormArray;
        array.clear(); 

        this.store.holiday().forEach(h => {
          array.push(
            runInInjectionContext(this.injector, () => injectPublicHolidayForm(h))
          );
        });
      });
    });
  }

  dialog = inject(MatDialog);

  getUpdatedDayName(date: string): string {
    try {
      return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date));
    } catch {
      return '';
    }
  }

  onDateChange(group: any) {
    const newDate = group.get('date')?.value;
    const newDay = this.getUpdatedDayName(newDate);
    group.get('day')?.setValue(newDay);
  }

  onUpdate(rowForm: any) {
    if (rowForm.valid) {
      this.updateHoliday(rowForm.getRawValue());
    }
  }

  onDelete(index: number, rowId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this public holiday?');

    if (!confirmed) return;

    this.deleteHoliday(rowId);
  }


  onAddNew() {
    const dialogRef = this.dialog.open(AddHolidayDialogComponent, {
      width: '32rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newId = this.store.addHolidayFromDialog(this.injector, {
          ...result,
          day: format(parseISO(result.date), 'EEEE')
        });
      }
    });
  }
}
