import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthInterceptor } from 'src/user/interceptors/auth.interceptor';
import { UserService } from 'src/user/user.service';
import { SignalController } from './signal.controller';
import { Signal, SignalSchema } from './signal.schema';
import { SignalService } from './signal.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signal.name, schema: SignalSchema }]),
  ],
  controllers: [SignalController],
  providers: [SignalService],
})
export class SignalModule {}
