import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserInfo(req: any): Promise<{
        status: any;
        plan: any;
        fullName: string;
        email: string;
        subscriptionEnds: any;
        price: any;
        subscriptionHistory: import("../types/type").SubscriptionHistory[];
    }>;
    create(createUserDto: CreateUserDto, req: any): Promise<any>;
    updatePassword(updatePassowrdDto: UpdatePasswordDto, req: any): Promise<string>;
    remove(req: any, res: any): Promise<any>;
}
