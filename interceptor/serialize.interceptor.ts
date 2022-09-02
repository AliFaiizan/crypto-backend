import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'

import {Observable} from 'rxjs'
import {map} from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor{
    new (...args:any[]):{}
}

export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}


export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto:ClassConstructor){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //run something befor the request is handled 
        //by requrest handler

         //console.log('i am running before the handler')

        return next.handle().pipe(map((data:ClassConstructor) => { 
            //run sonething before the responce in ssend out
            
            return plainToClass(this.dto,data,{excludeExtraneousValues:true})

         }))

    }
}