import { Injectable , NotFoundException,BadRequestException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import  {JwtService}  from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable({})
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  //this is for signUP
  async signUp(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.UserService.createUser(email, hashedPassword);

    return await user.save();
  }

  async login(email: string, password: string) {
    const user = await this.UserService.findUser(email);
    if (!user) {
      throw new NotFoundException('User Does Not Exists Try Signing Up First');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Password');
    }

    const jwtToken = await this.jwtService.signAsync({ id: user._id });
    await this.UserService.findandUpdate(
      { _id: user._id },
      { token: jwtToken },
    );

    return jwtToken;

  }

  // async forgetPassword(email:string){
  //   const user = await this.userModel.findOne({email});
  //   if(!user){
  //        throw new NotFoundException(
  //          'User Does Not Exists',
  //        );

  //   }
  //   return {message:'Password reset link has been sent to your email'}
  // }
}