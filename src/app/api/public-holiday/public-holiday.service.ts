import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ApiResponse, baseUrl } from '../../app.config';
import { PublicHolidayDto } from '../../models/public-holiday/public-holiday.model';

@Injectable({ providedIn: 'root' })
export class PublicHolidayService {
    readonly #http = inject(HttpClient);

    getAllAsync = () => lastValueFrom(this.getAll());
    getAll = () => this.#http.get<ApiResponse<PublicHolidayDto[]>>(`${baseUrl}/public-holiday`);

    addAsync = (dto: Omit<PublicHolidayDto, 'id'>) => lastValueFrom(this.add(dto));
    add = (dto: Omit<PublicHolidayDto, 'id'>) =>
        this.#http.post<PublicHolidayDto>(`${baseUrl}/public-holiday`, dto);

    updateAsync = (dto: PublicHolidayDto) => lastValueFrom(this.update(dto));
    update = (dto: PublicHolidayDto) =>
        this.#http.put(`${baseUrl}/public-holiday`, dto);

    deleteAsync = (id: number) => lastValueFrom(this.delete(id));
    delete = (id: number) =>
        this.#http.delete(`${baseUrl}/public-holiday/${id}`);

    exportToExcel = () => {
        return lastValueFrom(
            this.#http.post(`${baseUrl}/public-holiday/export`, {}, {
                responseType: 'blob'
            })
        );
    };
}
