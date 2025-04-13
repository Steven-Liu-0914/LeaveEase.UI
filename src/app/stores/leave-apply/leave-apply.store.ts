import { inject, computed, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { injectLeaveApplyForm } from './inject-leave-apply-form';
import { convertToLeaveApplicationDto, LeaveApplicationDto } from '../../models/leave-apply/leave-apply-dto.model';
import { injectLeaveApplyMutation } from '../../api/leave-apply/leave-apply.query';
import { showSuccessMessage } from '../../shared/api-response/showSuccessMessage';

export const LeaveApplyStore = signalStore(
    { providedIn: 'root', protectedState: false },

    withComputed(() => {
        const form = injectLeaveApplyForm();
        const formValue = toSignal(form.valueChanges, { initialValue: form.value });
        const formStatus = toSignal(form.statusChanges, { initialValue: form.status });

        const isFormInValid = computed(() => formStatus() === 'INVALID' && (form.touched || form.dirty));

        return {
            form: computed(() => form),
            formValue,
            formStatus,
            isFormInValid,
        };
    }),

    withMethods((store) => {
        const injectLeaveApplyFormClient = injectLeaveApplyMutation();

        const submitLeave = async () => {
            const leaveData = convertToLeaveApplicationDto(store.form().getRawValue());
            await injectLeaveApplyFormClient.mutateAsync(leaveData).then(() => {             
                store.form().reset();
            })
        };

        return {
            submitLeave,
        };
    })
);
