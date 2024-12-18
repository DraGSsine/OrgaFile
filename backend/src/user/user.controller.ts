import {
  Controller,
  Body,
  Delete,
  Put,
  Req,
  UseGuards,
  Get,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';

@UseGuards(AuthGuard)
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserInfo(@Req() req: any) {
    return this.userService.getUserInfo(req.user.userId);
  }
  @Put("update-profile")
  create(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    
    return this.userService.updateProfile(createUserDto,req.user.userId);
  }

  @Put("update-password")
  updatePassword(@Body() updatePassowrdDto:UpdatePasswordDto , @Req() req: any) {
    console.log(updatePassowrdDto)
    return this.userService.updatePassword(updatePassowrdDto, req.user.userId);
  }

  @Delete('delete')
  async remove(@Req() req: any, @Res() res: any) {
    await this.userService.remove(req.user.userId);
    res.clearCookie('token');
    return res.send({ message: 'user removed' });
  }
}
