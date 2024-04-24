import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
    @IsString()
    signInFor: "Projects" | "Designs";
    @IsEmail()
    email: string;
    @IsString()
    @IsStrongPassword({minLength: 6, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0})
    password: string;
    @IsString()
    field: string;
  }