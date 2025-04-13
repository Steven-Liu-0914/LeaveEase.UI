import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { StaffLeaveQuotaDto } from '../../models/leave-quota/leave-quota-dto.model';
import { computed } from '@angular/core';
import { injectLeaveQuotaQuery, injectUpdateLeaveQuotaMutation } from '../../api/leave-quota/leave-quota.query';


export const LeaveQuotaStore = signalStore(
    { providedIn: 'root', protectedState: false },

    withComputed(() => {
        const injectLeaveQuotaQueryClient = injectLeaveQuotaQuery();
        const leaveQuota = computed(() => injectLeaveQuotaQueryClient.data()?.data ?? [] as StaffLeaveQuotaDto[]);

        return {
            leaveQuota: computed(() => leaveQuota()),
        }
    }),

    withMethods((store) => {

        const updateLeaveQuotaMutation = injectUpdateLeaveQuotaMutation();

        const saveQuota = (quotaDto: StaffLeaveQuotaDto) => {
            updateLeaveQuotaMutation.mutateAsync(quotaDto);
        };

        return { saveQuota };
    })
);


