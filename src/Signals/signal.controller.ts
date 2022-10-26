import {Body, Controller,Delete,ForbiddenException,Get,NotFoundException,Param,Patch,Post, Req, UseInterceptors } from "@nestjs/common";
import { SignalService } from "./signal.service";
import { DefiService } from "./defi.service";
import { Signal, SignalDocument } from "./signal.schema";
import { AuthInterceptor } from "src/user/interceptors/auth.interceptor";
import { CurrentUser } from "src/user/decorator/current-user.decorator";
@Controller()
export class SignalController {
  constructor(private SingnalService: SignalService,
          ) {}

  @Get('/signal')
  async getSignals() {
    const signals: any = await this.SingnalService.getSignals();

    return signals;
  }
 //for posting signal
  @Post('/signal')
  @UseInterceptors(AuthInterceptor)
  async createSignal(@Body() body: SignalDocument, @CurrentUser() user: any) {
    if (!user.isAdmin) {
      throw new ForbiddenException('you are not authroized');
    }
    return await this.SingnalService.createSignal(body);
  }
  //for updating signal
  @Patch('/signal/:id')
  async updateSignal(@Body() body: any, @Param('id') id: string) {
    return await this.SingnalService.updateSignal(id, body);
  }
  //for deleting signal
  @Delete('/signal/:id')
  async deleteSignal(@Param('id') id: string) {
    return await this.SingnalService.deleteSignal(id);
  }


  //for getting all the dfi projects
  @Get('/defi')
  async getDefiProjects() {
    
  }
}