import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import bcrypt from 'bcrypt'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(
   @Body('email') email: string,
   @Body('password') password: string,
   @Body('confirmPassword') confirmPassword: string) {

    // if(password !== confirmPassword){
    //     return {message:'Passwords do not match'}

    // }

    //const hashedPassword = await bcrypt.hash(password, 10);

    console.log(email, password, confirmPassword)



   const createdUser=this.authService.createUser(email, password);


    return createdUser;
  }

  @Post('login')
  login() {
    this.authService.login();
  }
}