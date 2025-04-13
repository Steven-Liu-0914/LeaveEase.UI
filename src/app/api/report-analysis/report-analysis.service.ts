import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ApiResponse, baseUrl } from '../../app.config';
import { ReportAnalysisDto } from '../../models/report-analysis/report-analysis.model';

export interface ReportFilter {
    startDate: string | null;
    endDate: string | null;
    department: string | null;
    keyword: string | null;
}

@Injectable({ providedIn: 'root' })
export class ReportAnalysisService {
    readonly #http = inject(HttpClient);

    getReportAsync = (filter: ReportFilter) => lastValueFrom(this.getReport(filter));

    getReport = (filter: ReportFilter) => {
        return this.#http.post<ApiResponse<ReportAnalysisDto[]>>(`${baseUrl}/report/analysis`, filter);
    };

    exportToExcel = (filter: ReportFilter) => {
        return lastValueFrom(
            this.#http.post(`${baseUrl}/report/analysis/export`, filter, {
                responseType: 'blob'
            })
        );
    };
}
