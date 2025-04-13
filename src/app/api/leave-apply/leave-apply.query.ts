import { inject, Injector } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import { LeaveApplyService } from './leave-apply.service';
import { LeaveApplicationDto } from '../../models/leave-apply/leave-apply-dto.model';
import { showSuccessMessage } from '../../shared/api-response/showSuccessMessage';
import { showApiErrorMessage } from '../../shared/api-response/showApiErrorMessage';

export const injectLeaveApplyMutation = () => {
    const leaveApplyService = inject(LeaveApplyService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (dto: LeaveApplicationDto) => leaveApplyService.submitLeaveAsync(dto),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            queryClient.invalidateQueries({ queryKey: ['leave-history'] });

            showSuccessMessage('Leave application submitted successfully!', injector);
        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};
