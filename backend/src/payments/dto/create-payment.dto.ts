import { IsIn, IsNumberString, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsString()
    price_id: string;
}
