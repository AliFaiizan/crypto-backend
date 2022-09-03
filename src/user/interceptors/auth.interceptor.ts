import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user.service';


export class CurrentUserInterceptor implements NestInterceptor{

    constructor(
        private UserService:UserService,
        private JwtService:JwtService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request = context.switchToHttp().getRequest();

        const cookie = request.session.cookie;

        console.log("This is the cookie",cookie)

         const newToken = cookie.split('=')[1];
         const res = await this.JwtService.verify(newToken);
         console.log("ahtis is the res",res);
         const user = await this.UserService.findUser({ _id: res.id });

         if(!user){
            throw new NotFoundException('Please login first')
         }

        return next.handle();
    }
}