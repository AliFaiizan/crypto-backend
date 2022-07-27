import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from 'config';


@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(MONGO_URL),
  ],
})
export class AppModule {}
