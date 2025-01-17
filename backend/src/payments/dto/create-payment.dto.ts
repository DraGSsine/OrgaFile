import { IsIn, IsNumberString, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  plan: "Starter" | "Pro" | "Business";
}

