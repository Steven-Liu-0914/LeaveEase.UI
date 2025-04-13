import { inject } from '@angular/core';
import {
    injectMutation,
    injectQuery,
    QueryClient
} from '@tanstack/angular-query-experimental';
import { ReportAnalysisService, ReportFilter } from './report-analysis.service';

export const injectReportAnalysisQuery = () => {
    const service = inject(ReportAnalysisService);

    return injectMutation(() => ({
        mutationFn: (filter: ReportFilter) => service.getReportAsync(filter)
    }));
};

export const injectExportReportMutation = () => {
    const service = inject(ReportAnalysisService);

    return injectMutation(() => ({
        mutationFn: (filter: ReportFilter) => service.exportToExcel(filter)
    }));
};
