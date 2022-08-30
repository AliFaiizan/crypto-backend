import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SingupUserDto } from "./dtos/signUp-dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(
    @Body() {email,password,confirmPassword}: SingupUserDto,
  ) {
    if (password !== confirmPassword) {
      return { message: 'Passwords do not match' };
    }

    const createdUser = await this.authService.createUser(
      email,
      password,
    );

    return { message: 'Sucessfully Signed Up', userId: createdUser._id };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
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