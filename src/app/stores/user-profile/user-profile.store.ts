import { signalStore, withComputed, withMethods, withState, patchState } from '@ngrx/signals';
import { injectUserProfileForm } from './inject-user-profile-form';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed } from '@angular/core';
import { convertToUserProfileDto, UserProfileDto } from '../../models/user-profile/user-profile-dto.model';
import { injectUpdateUserProfileMutation, injectUserProfileQuery } from '../../api/user-profile/user-profile.query';


export const UserProfileStore = signalStore(
    { providedIn: 'root', protectedState: false },

    withComputed(() => {
        const form = injectUserProfileForm();
        const formValue = toSignal(form.valueChanges, { initialValue: form.value });
        const formStatus = toSignal(form.statusChanges, { initialValue: form.status });
        const isFormInValid = computed(() => formStatus() === 'INVALID');

        return {
            form: computed(() => form), formValue, formStatus, isFormInValid
        };
    }),
    withMethods((store) => {
        const updateUserProfileMutation = injectUpdateUserProfileMutation();
        const submitProfile = async () => {
            const dto = convertToUserProfileDto(store.form().getRawValue());
            await updateUserProfileMutation.mutateAsync(dto);

        };

        return { submitProfile };
    })
);

