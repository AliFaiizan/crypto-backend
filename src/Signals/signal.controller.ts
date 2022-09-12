import {Body, Controller,Delete,ForbiddenException,Get,NotFoundException,Param,Patch,Post, Req, UseInterceptors } from "@nestjs/common";
import { SignalService } from "./signal.service";
import { DefiService } from "./defi.service";
import { Signal, SignalDocument } from "./signal.schema";
import { AuthInterceptor } from "src/user/interceptors/auth.interceptor";
import { CurrentUser } from "src/user/decorator/current-user.decorator";
@Controller()
export class SignalController {
  constructor(private SingnalService: SignalService,
           private readonly DefiService:DefiService) {}

  @Get('/signal')
  async getSignals() {
    const signals: any = await this.SingnalService.getSignals();

    return signals;
  }

  @Post('/signal')
  @UseInterceptors(AuthInterceptor)
  async createSignal(@Body() body: SignalDocument, @CurrentUser() user: any) {
    if (!user.isAdmin) {
      throw new ForbiddenException('you are not authroized');
    }
    return await this.SingnalService.createSignal(body);
  }

  @Patch('/signal/:id')
  async updateSignal(@Body() body: any, @Param('id') id: string) {
    return await this.SingnalService.updateSignal(id, body);
  }

  @Delete('/signal/:id')
  async deleteSignal(@Param('id') id: string) {
    return await this.SingnalService.deleteSignal(id);
  }

  @Get('/defi')
  async getDefiProjects() {
    return this.DefiService.getDefiProjects();
  }
}