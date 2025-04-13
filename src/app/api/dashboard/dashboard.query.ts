import { inject, Injector } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { DashboardService } from './dashboard.service';
import { StaffLeaveQuotaDto } from '../../models/leave-quota/leave-quota-dto.model';
import { showApiErrorMessage } from '../../shared/api-response/showApiErrorMessage';
import { showSuccessMessage } from '../../shared/api-response/showSuccessMessage';
import { LeaveQuotaService } from '../leave-quota/leave-quota.service';

export const injectDashboardQuery = () => {
    const dashboardService = inject(DashboardService);

    return injectQuery(() => ({
        queryKey: ['dashboard'],
        queryFn: () => dashboardService.getDashboardAsync()
    }));
};


export const injectApproveLeaveQuotaMutation = () => {
    const service = inject(DashboardService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (leaveId: number) => service.approveLeaveAsync(leaveId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            showSuccessMessage('Staff Leave Approve successfully', injector);
        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};


export const injectRejectLeaveQuotaMutation = () => {
    const service = inject(DashboardService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (leaveId: number) => service.rejectHistoryAsync(leaveId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            showSuccessMessage('Staff Leave Reject successfully', injector);
        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};
