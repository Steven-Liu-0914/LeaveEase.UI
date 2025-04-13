import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LeaveHistoryDto } from '../../models/leave-history/leave-history-dto.model';
import { ApiResponse, baseUrl, getLoginStaffId } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class LeaveHistoryService {
  readonly #http = inject(HttpClient);

  getHistoryAsync = () => {
    return lastValueFrom(this.getHistory());
  };

  getHistory = () => {
    return this.#http.get<ApiResponse<LeaveHistoryDto[]>>(`${baseUrl}/leave/history/${getLoginStaffId()}`);
  };

  updateHistoryAsync = (dto: LeaveHistoryDto, leaveId: number) => {
    return lastValueFrom(this.updateHistory(dto, leaveId));
  };

  updateHistory = (dto: LeaveHistoryDto, leaveId: number) => {
    return this.#http.put(`${baseUrl}/leave/update/${leaveId}`, dto);
  };

  cancelHistoryAsync = (leaveId: number) => {
    return lastValueFrom(this.cancelHistory(leaveId));
  };

  cancelHistory = (leaveId: number) => {
    return this.#http.delete(`${baseUrl}/leave/cancel/${leaveId}`);
  };
}
