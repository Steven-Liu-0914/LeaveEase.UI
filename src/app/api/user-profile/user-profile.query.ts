import { inject, Injector } from '@angular/core';
import {
    injectQuery,
    injectMutation,
    QueryClient
} from '@tanstack/angular-query-experimental';
import { UserProfileDto } from '../../models/user-profile/user-profile-dto.model';
import { UserProfileService } from './user-profile.service';
import { showSuccessMessage } from '../../shared/api-response/showSuccessMessage';
import { showApiErrorMessage } from '../../shared/api-response/showApiErrorMessage';

export const injectUserProfileQuery = () => {
    const service = inject(UserProfileService);

    return injectQuery(() => ({
        queryKey: ['user-profile'],
        queryFn: () => service.getProfileAsync()
    }));
};

export const injectUpdateUserProfileMutation = () => {
    const service = inject(UserProfileService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (dto: UserProfileDto) => service.updateProfileAsync(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });

            showSuccessMessage('User Profile update successfully!', injector);

        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};
