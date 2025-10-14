export interface RegistrationRequestDto {
    email: string;
    name: string;
    phonenumber: string;
    password: string;
}

export interface LoginRequestDto {
    username: string;
    password: string;
}

export interface UserDto {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
}

export interface ChangePasswordDto
{
    userName : string; 
    oldPassword : string; 
    newPassword : string;
}

export interface UsersDto {
    users: UserDto[];
    totalRecords : number;
}

export interface UserUpdateDto
{
    name: string;
    phoneNumber: string; 
}

export interface LoginResponseDto
{
    user: UserDto; 
    token: string;
}

export interface ResponseDto
{
    result: any;
    isSuccess: boolean;
    message: string;
}

export interface UserRolesDto
{
    user : UserDto;
    roles: string[];
}

export interface AssignRoleDto
{
    email: string; 
    role : string; 
}