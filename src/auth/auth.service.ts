import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User , UserDocument } from "./user.schema";

import * as bcrypt from "bcrypt";

@Injectable({})
export class AuthService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {

  }
  //this is for signUP
  async createUser (email:string,password:string,){
    const user= await this.userModel.create({email,password});
    
    return await user.save();
  }

  async login(email:string,password:string) {

    const user = await this.userModel.findOne({email});
    if(!user){
        return {message:'User not found'}

    }
    // if(!await bcrypt.compare(password,user.password)){
    //     return {message:'Invalid password'}
    // }
    return {token:'thisis login token'}
  }

  async forgetPassword(email:string){
    const user = await this.userModel.findOne({email});
    if(!user){
        return {message:'User not found'}

    }
    return {message:'Password reset link has been sent to your email'}
  }
}