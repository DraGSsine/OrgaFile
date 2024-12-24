import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserInfo(req: any): Promise<{
        plan: any;
        fullName: any;
        email: any;
        subscriptionEnds: string;
        price: number;
        status: any;
        currency: any;
        lastFourDigits: any;
        cardBrand: any;
        subscriptionHistory: any[];
    }>;
    create(createUserDto: CreateUserDto, req: any): Promise<any>;
    updatePassword(updatePassowrdDto: UpdatePasswordDto, req: any): Promise<string>;
    remove(req: any, res: any): Promise<any>;
}
