import { Injectable , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User , UserDocument } from "./user.schema";
import * as bcrypt from "bcrypt";
import  {JwtService}  from "@nestjs/jwt";

@Injectable({})
export class AuthService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ,private readonly jwtService:JwtService
  ) {

  }
  //this is for signUP
  async createUser (email:string,password:string,){

    const hashedPassword = await bcrypt.hash(password, 10);

    const user= await this.userModel.create({email,password:hashedPassword});
    
    return await user.save();
  }

  async login(email:string,password:string) {

    const user = await this.userModel.findOne({email});
    if(!user){
        throw new NotFoundException('User Does Not Exists Try Signing Up First')

    }
    if(!await bcrypt.compare(password,user.password)){
        return {message:'Invalid password'}
    }

    const jwtToken = await this.jwtService.signAsync({id:user.id});

    return jwtToken;
  }

  async forgetPassword(email:string){
    const user = await this.userModel.findOne({email});
    if(!user){
         throw new NotFoundException(
           'User Does Not Exists',
         );

    }
    return {message:'Password reset link has been sent to your email'}
  }
}