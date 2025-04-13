import { signalStore, withState, patchState, withMethods, withComputed } from '@ngrx/signals';

import { computed } from '@angular/core';
import { ReportAnalysisDto } from '../../models/report-analysis/report-analysis.model';
import { injectExportReportMutation, injectReportAnalysisQuery } from '../../api/report-analysis/report-analysis.query';
import { ReportFilter } from '../../api/report-analysis/report-analysis.service';

export const ReportAnalysisStore = signalStore(
    { providedIn: 'root', protectedState: false },

    withState(() => ({
        reports: [] as ReportAnalysisDto[],
    })),

    withComputed(({ reports }) => ({
        reportList: computed(() => reports())
    })),

    withMethods((store) => {
        const injectReportAnalysisQueryClient = injectReportAnalysisQuery();
        const injectExportReportMutationClient = injectExportReportMutation();
        const filterReports = (filter: ReportFilter) => {
            injectReportAnalysisQueryClient.mutateAsync(filter).then((response) => {
                patchState(store, { reports: response.data });
            });
        }
        const exportToExcel = (filter: ReportFilter) => {
            injectExportReportMutationClient.mutateAsync(filter).then((blob) => {
                // Step 1: Create a download link
                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;

                // Step 2: Set a file name
                a.download = `report-analysis-${new Date().toISOString().split('T')[0]}.xlsx`;

                // Step 3: Append and trigger click
                document.body.appendChild(a);
                a.click();

                // Step 4: Clean up
                document.body.removeChild(a);
                window.URL.revokeObjectURL(blobUrl);
            });
        };


        return { filterReports, exportToExcel };
    })
);


