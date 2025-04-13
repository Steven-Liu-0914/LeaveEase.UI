import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CalendarEventDto } from '../../models/calendar/calendar-event';
import { ApiResponse, baseUrl } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class CalendarService {
    #http = inject(HttpClient);


    getCalendarByMonthAsync = (year: number, month: number) => {
        return lastValueFrom(this.getCalendarByMonth(year, month));
    };

    getCalendarByMonth = (year: number, month: number) => {
        return this.#http.get<ApiResponse<CalendarEventDto[]>>(`${baseUrl}/calendar?year=${year}&month=${month}`)
    };
}