import { Body, Controller, Post, Res,BadRequestException ,} from "@nestjs/common";
import { Serialize } from "interceptor/serialize.interceptor";
import { AuthService } from "./auth.service";
import { SingupUserDto, LoginUserDto } from "./dtos/auth.dto";

import { UserDto } from "./dtos/user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(UserDto)
  @Post('signUp')
  async signUp(
    @Body() {email,password,confirmPassword}: SingupUserDto,
  ) {
    if (password !== confirmPassword) {
       throw new BadRequestException('Password Doesnot Match');
    }

    const createdUser = await this.authService.createUser(
      email,
      password,
    );

    return  createdUser;
  }

  @Post('login')
  async login(
  @Body() {email,password}: LoginUserDto,
    @Res({passthrough:true}) res: any,// this is for express responce
  ) {
    const token = await this.authService.login(email, password);

    res.cookie('token', token, {httpOnly:true});
    return { message: 'Sucessfully Logged In' };
  }

  @Post('forgetPassword')
  async forgetPassword(
    @Body('email') email: string,
  ) {
    const result = await this.authService.forgetPassword(email);
   

    return result;
  }
}