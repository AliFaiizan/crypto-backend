import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {SignalModule} from './signals/signal.module';

import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from 'config';
import { DefiModule } from './defi/defi.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    SignalModule,
    MongooseModule.forRoot(MONGO_URL),
    DefiModule,
  ],
})
export class AppModule {}
