import { inject, Signal } from '@angular/core';

import { CalendarService } from './calendar.service';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { CalendarEventDto } from '../../models/calendar/calendar-event';



export const injectCalendarQuery = () => {
    const service = inject(CalendarService);

    return injectMutation(() => ({
        mutationFn: (request: { year: number, month: number }) => service.getCalendarByMonthAsync(request.year, request.month),
    }));
};