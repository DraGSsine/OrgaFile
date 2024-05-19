import { IsIn, IsNumberString, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsString()
    user_id: string;
    @IsIn(['Basic','Standard','Premium'])
    @IsString()
    plan: string;
    @IsString()
    url_success: string;
    @IsString()
    url_cancel: string;
    @IsNumberString()
    price: number;
}
