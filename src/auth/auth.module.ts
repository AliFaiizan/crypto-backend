import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
// import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from '../user/user.schema';
import { UserService } from "src/user/user.service";



 @Module({
    imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}]) ,
    JwtModule.register({secret:'Thisissparta',signOptions:{expiresIn:'1h'}}),
   ],
    controllers:[],
    providers:[AuthService,UserService],
    exports:[AuthService]   
 })
 export class AuthModule{

 }