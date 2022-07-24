import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User , UserDocument } from "./user.schema";

@Injectable({})
export class AuthService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {

    }


  async createUser (email:string,password:string,){

    return this.userModel.find({})
  }

  login() {
    return 'login';
  }
}