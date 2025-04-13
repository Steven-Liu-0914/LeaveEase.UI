import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse, baseUrl, getLoginStaffId } from '../../app.config';
import { DashboardDto } from '../../models/dashboard/dashboard-dto-model';


@Injectable({ providedIn: 'root' })
export class DashboardService {
    readonly #http = inject(HttpClient);

    getDashboardAsync = () => {
        return lastValueFrom(this.getDashboard());
    };

    getDashboard = () => {
        return this.#http.get<ApiResponse<DashboardDto>>(`${baseUrl}/dashboard/${getLoginStaffId()}`);
    };

    approveLeaveAsync = (leaveId: number) => {
        return lastValueFrom(this.approveLeave(leaveId));
    };

    approveLeave = (leaveId: number) => {
        return this.#http.put(`${baseUrl}/leave/approve/${leaveId}`, {});
    };


    rejectHistoryAsync = (leaveId: number) => {
        return lastValueFrom(this.rejectHistory(leaveId));
    };

    rejectHistory = (leaveId: number) => {
        return this.#http.put(`${baseUrl}/leave/reject/${leaveId}`, {});
    };
}
