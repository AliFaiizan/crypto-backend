import { Body, Injectable } from "@nestjs/common";


@Injectable({})
export class AuthService {
  async createUser (email:string,password:string){

    return { name:'Ali',hash:'titbit'}
  }

  login() {
    return 'login';
  }
}