import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Req,
  Session,
  Headers,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { Serialize } from 'interceptor/serialize.interceptor';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { SingupUserDto, LoginUserDto } from './dtos/auth.dto';
 
import { UserDto } from './dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './decorator/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/auth.interceptor';CurrentUserInterceptor

@Controller('auth')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly UserService: UserService,
    private readonly JwtService:JwtService
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
  @Serialize(UserDto)
  @UseInterceptors(CurrentUserInterceptor)
  async myProfile(@CurrentUser() user:any) {
   

    return user;
  }

  @Post('forgetPassword')
  async forgetPassword(@Body('email') email: string) {
    //const result = await this.authService.forgetPassword(email);
    // return result;
  }

  @Post('logout')
  async logout() {}
}
