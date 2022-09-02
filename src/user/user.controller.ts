import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Req,
  Session,
  Header,
  BadRequestException,
} from '@nestjs/common';
import { Serialize } from 'interceptor/serialize.interceptor';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { SingupUserDto, LoginUserDto } from './dtos/auth.dto';

import { UserDto } from './dtos/user.dto';


@Controller('auth')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly UserService:UserService
    ) {}

  @Serialize(UserDto)
  @Post('signUp')
  async signUp(@Body() { email, password, confirmPassword }: SingupUserDto) {
    if (password !== confirmPassword) {
      throw new BadRequestException('Password Doesnot Match');
    }

    const createdUser = await this.authService.signUp(email, password);

    return createdUser;
  }

  @Post('login')
  async login(
    @Body() { email, password }: LoginUserDto,
    @Res({ passthrough: true }) res: any, // this is for express responce
  ) {
    const token = await this.authService.login(email, password);

    res.cookie('token', token, { httpOnly: true });
    return { message: 'Sucessfully Logged In' };
  }

  @Get('profile')
  async myProfile(@Req() req:any){
    console.log(req)
  }

  @Post('forgetPassword')
  async forgetPassword(@Body('email') email: string) {
    //const result = await this.authService.forgetPassword(email);

   // return result;
  }

  @Post('logout')
  async logout() {}
}
