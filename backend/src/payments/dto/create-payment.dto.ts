import { IsIn, IsNumberString, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  plan: string;
}

