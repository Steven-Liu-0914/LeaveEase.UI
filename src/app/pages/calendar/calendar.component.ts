import {
  Component,
  computed,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
  isToday,
  addDays,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarMonthViewDay,
  CalendarUtils,
  CalendarView,
} from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { injectCalendarQuery } from '../../api/calendar/calendar.query';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule, NgbModalModule], // Import required modules
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [CalendarUtils, CalendarA11y, CalendarDateFormatter, CalendarEventTitleFormatter]
})
export class CalendarComponent {

  constructor() {
    this.loadEvents();
  }

  viewDate: Date = new Date(); // Set today’s date
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  modalData: ModalData | null = null;


  refresh = new Subject<void>();

  highlightToday({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (isToday(day.date)) {
        day.cssClass = 'bg-blue-200'; // Tailwind styles
      }
    });
  }


  injectCalendarQueryClient = injectCalendarQuery();


  async loadEvents() {
    const responseEvents = (await this.injectCalendarQueryClient.mutateAsync({ year: this.viewDate.getFullYear(), month: this.viewDate.getMonth() + 1 })).data;

    this.events = responseEvents?.map((event) => ({
      start: startOfDay(new Date(event.start)),
      end: endOfDay(new Date(event.end)),
      title: event.title,
      color: event.title.includes('Public Holiday') ? { primary: '#64A148', secondary: '#D1FFd3' } : { primary: '#1e90ff', secondary: '#D1E8FF' },
      allDay: true,
    })) || [];

  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];


  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    void this.loadEvents();
    this.activeDayIsOpen = false;
  }
}

export interface ModalData {
  action: string;
  event: CalendarEvent;
};
