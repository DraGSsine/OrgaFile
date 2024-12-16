import { IsNotEmpty, MinLength, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @MinLength(2)
    firstName?: string;

    @IsOptional()
    @IsNotEmpty()
    @MinLength(2)
    lastName?: string;
}