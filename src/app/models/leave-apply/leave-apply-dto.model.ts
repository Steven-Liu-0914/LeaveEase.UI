export interface LeaveApplicationDto {
    leaveType: string;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    reason: string;
}


export function convertToLeaveApplicationDto(formValue: any): LeaveApplicationDto {
    return {
        leaveType: formValue.leaveType ?? '',
        startDate: formValue.startDate ?? '',
        endDate: formValue.endDate ?? '',
        reason: formValue.reason ?? '',
    };
}