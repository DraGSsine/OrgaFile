import { registerDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument } from 'src/schemas/auth.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(@InjectModel("user") private readonly userModel:Model<userDocument>){};
    async signIn(){
        return "Sign In";
    }
    async signUp(registerDto:registerDto){
        const {email, password} = registerDto;
        const userExists = await this.userModel.findOne({
            email:email,
        })
        if(userExists){
            throw new UnauthorizedException("User already exists");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        this.userModel.create({
            ...registerDto,
            password:encryptedPassword
        });
        
    }
}
