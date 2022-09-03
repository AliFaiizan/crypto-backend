import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
    ForbiddenException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor{

    constructor(
        private UserService:UserService,
        private JwtService:JwtService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request:any = context.switchToHttp().getRequest();

        const cookie = request.headers?.cookie;

        if(!cookie){
           throw new ForbiddenException("Please login first");
        }
         const token = cookie.split('=')[1];
         const res = await this.JwtService.verify(token);
         const user = await this.UserService.findUser({ _id: res.id });

        if(!user){
            throw new ForbiddenException("User doesnot exists")
        }
        
        request.user=user;

        return next.handle();
    }
}