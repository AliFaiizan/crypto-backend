import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { AuthInterceptor } from 'src/user/interceptors/auth.interceptor';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { SignalController } from './signal.controller';
import { Signal, SignalSchema } from './signal.schema';
import { SignalService } from './signal.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signal.name, schema: SignalSchema }]),
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: 'Thisissparta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [SignalController],
  providers: [SignalService],
})
export class SignalModule {}
