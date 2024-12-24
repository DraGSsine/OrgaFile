import { IsEmail,MaxLength, MinLength, } from 'class-validator';

export class UpdatePasswordDto {
    currentPassword: string;
    @MinLength(6)
    @MaxLength(30)
    newPassword: string;
}
