import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

    constructor(
        private UserService:UserService,
        private JwtService:JwtService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request:any = context.switchToHttp().getRequest();

        const cookie = request.headers?.cookie;

        console.log(cookie)

         const newToken = cookie.split('=')[1];
         const res = await this.JwtService.verify(newToken);
         const user = await this.UserService.findUser({ _id: res.id });

         if(!user){
            throw new NotFoundException('Please login first')
         }
         request.user=user;

        return next.handle();
    }
}