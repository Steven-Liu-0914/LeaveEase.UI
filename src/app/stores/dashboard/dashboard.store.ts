import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { DashboardDto } from '../../models/dashboard/dashboard-dto-model';
import { computed } from '@angular/core';
import { injectApproveLeaveQuotaMutation, injectDashboardQuery, injectRejectLeaveQuotaMutation } from '../../api/dashboard/dashboard.query';


export const DashboardStore = signalStore(
    { providedIn: 'root', protectedState: false },

    withComputed(() => {
        const injectDashboardQueryClient = injectDashboardQuery();
        const dashboard = computed(() => injectDashboardQueryClient.data()?.data ?? {} as DashboardDto);

        const summary = computed(() => ({
            remainingLeave: dashboard().remainingLeave,
            upcomingLeave: dashboard().upcomingLeave,
            totalApplied: dashboard().totalApplied,
          
        }));
        const nextUpcomingLeave = computed(() => dashboard().nextUpcomingLeave);
        const pendingApprovals = computed(() => dashboard().pendingApproveLeave);
        const remainingDetails = computed(() => dashboard().remainingDetails);

        return {
            dashboard: computed(() => dashboard()),
            summary: computed(() => summary()),
            nextUpcomingLeave: computed(() => nextUpcomingLeave()),
            pendingApprovals: computed(() => pendingApprovals()),
            remainingDetails: computed(() => remainingDetails())
        }
    }),
    withMethods(() => {
        const injectApproveLeaveQuotaMutationClient = injectApproveLeaveQuotaMutation();
        const injectRejectLeaveQuotaMutationClient = injectRejectLeaveQuotaMutation();
        const approveLeave = async (id: number) => {
            await injectApproveLeaveQuotaMutationClient.mutateAsync(id);
        };
        const rejectLeave = async (id: number) => {
            await injectRejectLeaveQuotaMutationClient.mutateAsync(id);
        };

        return { approveLeave, rejectLeave };
    })
);
