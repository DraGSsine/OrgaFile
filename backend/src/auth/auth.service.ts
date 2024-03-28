import { signInDto, signUpDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument } from 'src/schemas/auth.schema';
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt"
@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService , @InjectModel("user") private readonly userModel:Model<userDocument>){};
    async signIn(signInDto:signInDto){
        const {email, password} = signInDto;
        const user = await this.userModel.findOne({
            email:email,
        });
        if(!user)
            throw new UnprocessableEntityException("Email or password is incorrect");
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            throw new UnprocessableEntityException("Email or password is incorrect");
        const token = await this.jwtService.signAsync({email}, {expiresIn:"1h",secret:process.env.jwtSecretKey});
        const refreshToken = await this.jwtService.signAsync({email:email}, {expiresIn:"7d",secret:process.env.refreshToken});
        return {token,refreshToken};
    }
    async signUp(signUpDto:signUpDto){
        const {email, password} = signUpDto;
        const userExists = await this.userModel.findOne({
            email:email,
        })
        if(userExists){
            throw new UnprocessableEntityException("User already exists");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        this.userModel.create({
            ...signUpDto,
            password:encryptedPassword
        });
        
    }
}
