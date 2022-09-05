import { BadRequestException, Injectable } from "@nestjs/common";
import { SignalDocument, Signal } from "./signal.schema";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable({})
export class SignalService {
    constructor(
    @InjectModel(Signal.name) private readonly signalModel: Model<SignalDocument>,
    ){}

    async getSignals() {
        return await this.signalModel.find({isActive:true})
    }

    async createSignal( signal: SignalDocument) {

        try{
            await this.signalModel.create(signal);
        }catch{
            throw new BadRequestException('failed to create Signal')
        }

        return {
            message:"Sucessfully Created Signal"
        }
    
    }

    async updateSignal(id:string,updates:object){
        console.log(updates)
        return await this.signalModel.findOneAndUpdate({_id:id},updates,{new:true});
    }

    async deleteSignal(id:string){
        return await this.signalModel.deleteOne({_id:id})
    }

}