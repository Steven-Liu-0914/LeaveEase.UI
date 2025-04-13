import { signalStore, withState, withComputed, patchState, withMethods } from '@ngrx/signals';

import { toSignal } from '@angular/core/rxjs-interop';
import { LeaveHistoryDto } from '../../models/leave-history/leave-history-dto.model';
import { injectCancelLeaveHistoryMutation, injectLeaveHistoryQuery, injectUpdateLeaveHistoryMutation } from '../../api/leave-history/leave-history.query';
import { computed } from '@angular/core';

export const LeaveHistoryStore = signalStore(
    { providedIn: 'root', protectedState: false },

    withComputed(() => {
        const injectLeaveHistoryQueryClient = injectLeaveHistoryQuery();
        const leaveHistory = computed(() => injectLeaveHistoryQueryClient.data()?.data ?? [] as LeaveHistoryDto[]);

        return {
            leaveHistory: computed(() => leaveHistory()),

        }
    }),
    withMethods(() => {
        const updateLeaveHistoryMutation = injectUpdateLeaveHistoryMutation();
        const cancelLeaveHistoryMutation = injectCancelLeaveHistoryMutation();

        const cancelLeave = async (row: LeaveHistoryDto) => {
            await cancelLeaveHistoryMutation.mutateAsync(row.leaveApplicationId)
        };

        const updateLeave = async (updated: LeaveHistoryDto) => {
            await updateLeaveHistoryMutation.mutateAsync({ dto: updated, leaveId: updated.leaveApplicationId });
        };

        return { cancelLeave, updateLeave };
    })

);

