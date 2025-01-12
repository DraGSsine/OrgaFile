import { signInDto, signUpDto } from "./dto/auth.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "../schemas/auth.schema";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { subscriptionDocument } from "../schemas/subscriptions.schema";
import axios from "axios";
import { UserInfoResponseType } from "src/types/type";
import { randomBytes } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel("user") private readonly userModel: Model<UserDocument>,
    @InjectModel("Subscription")
    private readonly subscriptionModel: Model<subscriptionDocument>
  ) {}

  async signIn(signInDto: signInDto) {
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnprocessableEntityException("Email or password is incorrect");
    }
    const userId = user._id.toString();
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnprocessableEntityException("Email or password is incorrect");
    }
    const isSubscribed = await this.subscriptionModel.findOne({
      userId: user._id,
    });
    const token = await this.generateTokens(userId, !!isSubscribed);
    return {
      message: "User signed in successfully",
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
    };
  }

  async signUp(signUpDto: signUpDto) {
    const { email, password, acceptTerms } = signUpDto;
    if (!acceptTerms) {
      throw new UnprocessableEntityException(
        "Please accept terms and conditions"
      );
    }
    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new UnprocessableEntityException("User already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      ...signUpDto,
      password: encryptedPassword,
    });
    const userId = newUser._id.toString();
    const token = await this.generateTokens(userId, false);
    return {
      token,
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
      },
    };
  }

  async googleAuth(token: string) {
    try {
      const { data }: { data: UserInfoResponseType } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { email, name, email_verified, picture } = data;
      const user = await this.userModel.findOne({ email });
      // check if the user alreayd exist do login logic else do signup logic
      if (user) {
        const userId = user._id.toString();
        const isSubscribed = await this.subscriptionModel.findOne({
          userId: user._id,
        });
        const accessToken = await this.generateTokens(userId, !!isSubscribed);
        return {
          accessToken,
          user: {
            id: user._id.toString(),
            email: user.email,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
          },
        };
      } else {
        const hashPassowrd = await bcrypt.hash(
          randomBytes(20).toString("hex"),
          10
        );
        const newUser = await this.userModel.create({
          email,
          fullName: name,
          isEmailVerified: email_verified,
          profilePicture: picture,
          password: hashPassowrd,
        });
        const userId = newUser._id.toString();
        const accessToken = await this.generateTokens(userId, false);
        return {
          accessToken,
          user: {
            id: newUser._id.toString(),
            email: newUser.email,
            fullName: newUser.fullName,
            profilePicture: newUser.profilePicture,
          },
        };
      }
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException("Invalid token");
    }
  }

  private async generateTokens(userId: string, isSubscribed: boolean) {
    const accessToken = await this.jwtService.signAsync(
      { userId, isSubscribed },
      { expiresIn: "7d", secret: process.env.JWT_SECRET_KEY }
    );

    return accessToken;
  }
}
