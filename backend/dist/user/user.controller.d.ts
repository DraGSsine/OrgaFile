import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserInfo(req: any): unknown;
    create(createUserDto: CreateUserDto, req: any): unknown;
    updatePassword(updatePassowrdDto: UpdatePasswordDto, req: any): unknown;
    remove(req: any, res: any): unknown;
}
