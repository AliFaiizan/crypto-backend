import {Body, Controller,Delete,ForbiddenException,Get,NotFoundException,Param,Patch,Post, Req, UseInterceptors } from "@nestjs/common";
import { SignalService } from "./signal.service";
import { Signal, SignalDocument } from "./signal.schema";
import { AuthInterceptor } from "src/user/interceptors/auth.interceptor";

@Controller()
export class SignalController {
  constructor(private SingnalService: SignalService) {}

  @Get('/signal')
  async getSignals() {
    const signals: any = await this.SingnalService.getSignals();

    return signals;
  }

  @Post('/signal')
  
  async postSignal(@Body() body: SignalDocument,@Req() req:any) {
    if(!req.user.isAdmin){
      throw new ForbiddenException('you are not authroized')
    }
    return await this.SingnalService.createSignal(body);
  }

  @Patch('/signal/:id')
  async patchSignal(@Body() body: any, @Param('id') id: string) {
    return await this.SingnalService.updateSignal(id, body);
  }

  @Delete('/signal/:id')
  async deleteSignal(@Param('id') id: string) {
    return await this.SingnalService.deleteSignal(id)
  }
}