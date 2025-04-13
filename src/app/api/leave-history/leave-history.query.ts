import { inject, Injector, Signal } from '@angular/core';
import {
    injectQuery,
    injectMutation,
    QueryClient
} from '@tanstack/angular-query-experimental';
import { LeaveHistoryDto } from '../../models/leave-history/leave-history-dto.model';
import { LeaveHistoryService } from './leave-history.service';
import { showSuccessMessage } from '../../shared/api-response/showSuccessMessage';
import { showApiErrorMessage } from '../../shared/api-response/showApiErrorMessage';



export const injectLeaveHistoryQuery = () => {
    const service = inject(LeaveHistoryService);
    return injectQuery(() => ({
        queryKey: ['leave-history'],
        queryFn: () => service.getHistoryAsync()
    }));
};

export const injectUpdateLeaveHistoryMutation = () => {
    const service = inject(LeaveHistoryService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);
    
    return injectMutation(() => ({
        mutationFn: (request: { dto: LeaveHistoryDto, leaveId: number }) => service.updateHistoryAsync(request.dto, request.leaveId),
        onSuccess: () => {
            showSuccessMessage('Leave updated successfully!', injector);
            queryClient.invalidateQueries({ queryKey: ['leave-history'] })
        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};

export const injectCancelLeaveHistoryMutation = () => {
    const service = inject(LeaveHistoryService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (leaveId: number) => service.cancelHistoryAsync(leaveId),
        onSuccess: () => {
            showSuccessMessage('Leave has been cancelled!', injector);
            queryClient.invalidateQueries({ queryKey: ['leave-history'] });
        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};
