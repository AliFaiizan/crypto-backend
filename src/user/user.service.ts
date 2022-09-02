import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';


@Injectable({})
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  //this is for signUP
  async createUser(email: string, password: string) {

    const user = await this.userModel.create({
      email,
      password,
    });

    return await user.save();
  }

  async findUser(filter:object) {
    const user = await this.userModel.findOne(filter);
    if(!user){
      throw new NotFoundException('Couldnot find user')
    }
    return user;
  }

  async findandUpdate(filter:object,query:object){
    return await this.userModel.findOneAndUpdate(filter,query)
  }

  async forgetPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User Does Not Exists');
    }
    return { message: 'Password reset link has been sent to your email' };
  }
}
