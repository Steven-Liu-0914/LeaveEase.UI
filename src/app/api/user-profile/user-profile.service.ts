import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserProfileDto } from '../../models/user-profile/user-profile-dto.model';
import { ApiResponse, baseUrl, getLoginStaffId } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    readonly #http = inject(HttpClient);

    getProfileAsync = () => lastValueFrom(this.getProfile());

    getProfile = () => {
        return this.#http.get<ApiResponse<UserProfileDto>>(`${baseUrl}/user/profile/${getLoginStaffId()}`);
    };

    updateProfileAsync = (dto: UserProfileDto) => {
        return lastValueFrom(this.updateProfile(dto));
    };

    updateProfile = (dto: UserProfileDto) => {
        return this.#http.put(`${baseUrl}/user/profile/${getLoginStaffId()}`, dto);
    };
}
