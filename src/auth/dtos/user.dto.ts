import {Expose} from 'class-transformer'
//This is used to factor responce that is to be send out
export class UserDto{
    @Expose()
    _id:object;

    @Expose()
    email:string
   
}