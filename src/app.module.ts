import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://docker:mongopw@localhost:49153/'),
  ],
})
export class AppModule {}
