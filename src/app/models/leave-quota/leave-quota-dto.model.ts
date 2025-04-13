export interface StaffLeaveQuotaDto {
    staffId: number;
    staffNumber: string;
    staffName: string;
    quotas: {
        children: number;
        annual: number;
        sick: number;
        emergency: number;
    };
}

export type LeaveTypeKey = keyof StaffLeaveQuotaDto['quotas'];