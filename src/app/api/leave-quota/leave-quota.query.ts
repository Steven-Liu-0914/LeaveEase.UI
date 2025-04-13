import { inject, Injector } from '@angular/core';
import {
    injectQuery,
    injectMutation,
    QueryClient
} from '@tanstack/angular-query-experimental';

import { LeaveQuotaService } from './leave-quota.service';
import { StaffLeaveQuotaDto } from '../../models/leave-quota/leave-quota-dto.model';
import { showSuccessMessage } from '../../shared/api-response/showSuccessMessage';
import { showApiErrorMessage } from '../../shared/api-response/showApiErrorMessage';

export const injectLeaveQuotaQuery = () => {
    const service = inject(LeaveQuotaService);
    return injectQuery(() => ({
        queryKey: ['leave-quota'],
        queryFn: () => service.getQuotaAsync()
    }));
};

export const injectUpdateLeaveQuotaMutation = () => {
    const service = inject(LeaveQuotaService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (dto: StaffLeaveQuotaDto) => service.updateQuotaAsync(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leave-quota'] });
            showSuccessMessage('Staff Leave Quota Update successfully', injector);
        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};
