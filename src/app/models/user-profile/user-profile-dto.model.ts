export interface UserProfileDto {
    fullName: string;
    email: string;
    phone: string;
    department: string;
    jobTitle: string;
}

export function convertToUserProfileDto(formValue: any): UserProfileDto {
    return {
        fullName: formValue.fullName ?? '',
        email: formValue.email ?? '',
        phone: formValue.phone ?? '',
        department: formValue.department ?? '',
        jobTitle: formValue.jobTitle ?? ''
    };
}
