import {IsEmail,IsString, MaxLength, MinLength, registerDecorator} from 'class-validator';



export class SingupUserDto {
  @IsEmail()

  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password should be atleast 6 characters',
  })
  password: string;

  @MinLength(6, {
    message: 'Password should be atleast 6 characters',
  })
  @MaxLength(20)
  confirmPassword: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Invalid Password',
  })
  password: string;

}




