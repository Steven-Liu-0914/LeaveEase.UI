import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs'; import { baseUrl, getLoginStaffId } from '../../app.config';
import { LeaveApplicationDto } from '../../models/leave-apply/leave-apply-dto.model';

@Injectable({ providedIn: 'root' })
export class LeaveApplyService {
    readonly #http = inject(HttpClient);

    submitLeaveAsync = (dto: LeaveApplicationDto) => {
        return lastValueFrom(this.submitLeave(dto));
    };

    submitLeave = (dto: LeaveApplicationDto) => {
        return this.#http.post(`${baseUrl}/leave/apply/${getLoginStaffId()}`, dto);
    };
}
