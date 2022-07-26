import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User , UserDocument } from "./user.schema";

import * as bcrypt from "bcrypt";

@Injectable({})
export class AuthService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {

    }


  async createUser (email:string,password:string,){
    const user= await this.userModel.create({email,password});
    
    return await user.save();
  }

  async login(email:string,password:string) {

    const user = this.userModel.findOne({email});
    if(!user){
        return {message:'User not found'}

    }
    if(!await bcrypt.compare(password,user.password)){
        return {message:'Invalid password'}
    }
    return {token:'thisis login token'}
  }
}