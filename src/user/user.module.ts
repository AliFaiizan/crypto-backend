import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { AuthService } from 'src/auth/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import  {APP_INTERCEPTOR} from '@nestjs/core' // for making global inter ceptor
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'Thisissparta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,AuthService,AuthInterceptor],
  exports:[UserService]
})
export class UserModule {}
