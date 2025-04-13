export interface LeaveHistoryDto {
    leaveApplicationId: number;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: 'Approved' | 'Pending' | 'Rejected' | 'Cancelled';
}

export function convertToLeaveHistoryDto(formValue: any): LeaveHistoryDto {
    return {
        leaveApplicationId: formValue.leaveApplicationId ?? 0,
        leaveType: formValue.leaveType ?? '',
        startDate: formValue.startDate ?? '',
        endDate: formValue.endDate ?? '',
        reason: formValue.reason ?? '',
        status: formValue.status ?? 'Pending'  // default fallback
    };
}

