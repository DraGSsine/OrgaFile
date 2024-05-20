import { IsIn, IsNumberString, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsIn(['Basic','Standard','Premium'])
    @IsString()
    plan: string;
    @IsNumberString()
    price: number;
    @IsString()
    user_id: string;
}
