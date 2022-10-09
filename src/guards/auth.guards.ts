import { CanActivate,ExecutionContext } from "@nestjs/common";  
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";

//this is used for authenticated route

// export class AuthGuard implements CanActivate {
//   constructor(private UserService: UserService, private JwtService: JwtService){};

//   async canActivate(
//     context: ExecutionContext,
//   ) {
//     const request = context.switchToHttp().getRequest();

    
//     let user:any;
//     const cookie = request.headers?.cookie;
//     if(cookie){
//         const newToken = cookie?.split('=')[1];
//         const res = await this.JwtService.verify(newToken);
//          user = await this.UserService.findUser({ _id: res.id });

//     }

//      return ;
//   }
