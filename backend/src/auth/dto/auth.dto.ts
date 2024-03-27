import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class registerDto {
  @IsString()
  loginFor: "Projects" | "Designs";
  @IsEmail()
  email: string;
  @IsString()
  @IsStrongPassword({minLength: 6, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0})
  password: string;
  @IsString()
  filed: string;
}
export class loginDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
