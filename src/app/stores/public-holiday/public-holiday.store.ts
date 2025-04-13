import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';

import { format, parseISO } from 'date-fns';
import { PublicHolidayDto } from '../../models/public-holiday/public-holiday.model';
import { injectAddPublicHolidayMutation, injectDeletePublicHolidayMutation, injectExportHolidayCommand, injectPublicHolidayQuery, injectUpdatePublicHolidayMutation } from '../../api/public-holiday/public-holiday.query';
import { computed } from '@angular/core';

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

        const addHolidayFromDialog = async (holiday: PublicHolidayDto) => {
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



