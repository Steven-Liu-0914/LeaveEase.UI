import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ApiResponse, baseUrl, getLoginStaffId } from '../../app.config';
import { StaffLeaveQuotaDto } from '../../models/leave-quota/leave-quota-dto.model';

@Injectable({ providedIn: 'root' })
export class LeaveQuotaService {
    readonly #http = inject(HttpClient);

    getQuotaAsync = () => {
        return lastValueFrom(this.getQuota());
    };

    getQuota = () => {
        return this.#http.get<ApiResponse<StaffLeaveQuotaDto[]>>(`${baseUrl}/admin/leave/quota?requestedBy=${getLoginStaffId()}`);
    };

    updateQuotaAsync = (dto: StaffLeaveQuotaDto) => {
        return lastValueFrom(this.updateQuota(dto));
    };

    updateQuota = (dto: StaffLeaveQuotaDto) => {
        return this.#http.put(`${baseUrl}/admin/leave/quota?requestedBy=${getLoginStaffId()}`, dto);
    };
}
