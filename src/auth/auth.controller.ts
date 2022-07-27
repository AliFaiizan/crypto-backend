import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import * as bcrypt from 'bcrypt'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(
   @Body('email') email: string,
   @Body('password') password: string,
   @Body('confirmPassword') confirmPassword: string) {

    if(password !== confirmPassword){
        return {message:'Passwords do not match'}

    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser= await this.authService.createUser(email, hashedPassword);

    return {message:"Sucessfully Signed Up",
            userId:createdUser._id};
    }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string, 
    ) {
    const result = await this.authService.login(email,password);
    return result;
  }
}