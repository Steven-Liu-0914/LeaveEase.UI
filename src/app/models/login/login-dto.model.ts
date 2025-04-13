
export interface LoginDto {
    staffNumber: string;
    password: string;
}


export interface LoginInfoResponseDto {
    staffId: number;
    staffNumber: string;
    fullName: string;
    email: string;
    department: string;
    jobTitle: string;
    role: string;
}


export function convertToLoginDto(formValue: any): LoginDto {
    return {
        staffNumber: formValue.username,
        password: formValue.password
    };
}