import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { PublicHolidayDto } from '../../models/public-holiday/public-holiday.model';
import { injectAddPublicHolidayMutation, injectDeletePublicHolidayMutation, injectExportHolidayCommand, injectPublicHolidayQuery, injectUpdatePublicHolidayMutation } from '../../api/public-holiday/public-holiday.query';
import { computed, Injector } from '@angular/core';
import { showApiErrorMessage } from '../../shared/api-response/showApiErrorMessage';

let nextId = 100; // for demo add

export const PublicHolidayStore = signalStore(
    { providedIn: 'root', protectedState: false },

    withComputed(() => {
        const injectPublicHolidayQueryClient = injectPublicHolidayQuery();
        const computedPublicHolidayQueryClient = computed(() => injectPublicHolidayQueryClient);
        const holiday = computed(() => computedPublicHolidayQueryClient().data()?.data ?? [] as PublicHolidayDto[]);

        return {
            holiday: computed(() =>
                holiday().slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            ),
        }
    }
    ),

    withMethods((store) => {

        const updatePublicHolidayClient = injectUpdatePublicHolidayMutation();
        const addPublicHolidayClient = injectAddPublicHolidayMutation();
        const deletePublicHolidayClient = injectDeletePublicHolidayMutation();
        const exportPublicHolidayClient = injectExportHolidayCommand();

        const updateHoliday = async (updated: PublicHolidayDto) => {
            await updatePublicHolidayClient.mutateAsync(updated);
        };

        const addHolidayFromDialog = async (injector: Injector, holiday: PublicHolidayDto) => {
            const exists = store.holiday().some(h => h.date === holiday.date);

            if (exists) {
                showApiErrorMessage(
                    { error: { message: 'A public holiday on this date already exists.' } },
                    injector
                );
                return;
            }

            await addPublicHolidayClient.mutateAsync(holiday);
        };


        const deleteHoliday = async (id: number) => {
            await deletePublicHolidayClient.mutateAsync(id);
        };

        const exportToExcel = () => {
            exportPublicHolidayClient.mutateAsync().then((blob) => {
                // Step 1: Create a download link
                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;

                // Step 2: Set a file name
                a.download = `public-holiday-${new Date().toISOString().split('T')[0]}.xlsx`;

                // Step 3: Append and trigger click
                document.body.appendChild(a);
                a.click();

                // Step 4: Clean up
                document.body.removeChild(a);
                window.URL.revokeObjectURL(blobUrl);
            });
        };

        return { updateHoliday, addHolidayFromDialog, deleteHoliday, exportToExcel };
    })
);



