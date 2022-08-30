import {IsEmail,IsString} from 'class-validator';

export class SingupUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;
}