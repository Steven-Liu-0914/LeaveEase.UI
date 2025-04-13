import { inject, Injector } from '@angular/core';
import {
    injectQuery,
    injectMutation,
    QueryClient
} from '@tanstack/angular-query-experimental';
import { PublicHolidayService } from './public-holiday.service';
import { PublicHolidayDto } from '../../models/public-holiday/public-holiday.model';
import { showSuccessMessage } from '../../shared/api-response/showSuccessMessage';
import { showApiErrorMessage } from '../../shared/api-response/showApiErrorMessage';


export const injectPublicHolidayQuery = () => {
    const service = inject(PublicHolidayService);
    return injectQuery(() => ({
        queryKey: ['public-holiday'],
        queryFn: () => service.getAllAsync()
    }));
};

export const injectAddPublicHolidayMutation = () => {
    const service = inject(PublicHolidayService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (dto: PublicHolidayDto) => service.addAsync(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['public-holiday'] })
            showSuccessMessage('Add Public Holiday successfully', injector);
        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};

export const injectUpdatePublicHolidayMutation = () => {
    const service = inject(PublicHolidayService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (dto: PublicHolidayDto) => service.updateAsync(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['public-holiday'] })
            showSuccessMessage('Update Public Holiday successfully', injector);
        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};

export const injectDeletePublicHolidayMutation = () => {
    const service = inject(PublicHolidayService);
    const queryClient = inject(QueryClient);
    const injector = inject(Injector);

    return injectMutation(() => ({
        mutationFn: (id: number) => service.deleteAsync(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['public-holiday'] })
            showSuccessMessage('Delete Public Holiday successfully', injector);
        },
        onError: (error: any) => showApiErrorMessage(error, injector)
    }));
};

export const injectExportHolidayCommand = () => {
    const service = inject(PublicHolidayService);
    return injectMutation(() => ({
        mutationFn: () => service.exportToExcel()
    }));
};
