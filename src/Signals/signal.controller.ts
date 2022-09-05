import {Body, Controller,Delete,Get,NotFoundException,Param,Patch,Post } from "@nestjs/common";
import { SignalService } from "./signal.service";
import { Signal, SignalDocument } from "./signal.schema";

@Controller()
export class SignalController {
  constructor(private SingnalService: SignalService) {}

  @Get('/signal')
  async getSignals() {
    const signals: any = await this.SingnalService.getSignals();

    return signals;
  }

  @Post('/signal')
  async postSignal(@Body() body: SignalDocument) {
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