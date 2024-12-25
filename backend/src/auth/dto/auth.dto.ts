import { IsBoolean, IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class signUpDto {
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
  @IsBoolean()
  acceptTerms: boolean;
}
export class signInDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
