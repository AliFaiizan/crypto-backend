import { Controller, Get, Injectable } from '@nestjs/common';
;
import { DashboardService } from './Dashboard.service';

@Controller('Dashboard')
export class DashboardController {
  constructor(private readonly DashboardService:DashboardService) {}

  @Get()
  async getDashboard() {
   return await this.DashboardService.getDashboard();
  }

  @Get('rules')
  async getRules() {
    await this.DashboardService.getRules();
  }

  @Get('tradingPatterns')
  async getTradingPatterns() {
   return this.DashboardService.getTradingPatterns();
  }

  @Get('shortAnouncments')
  async getShortAnouncments() {
   return this.DashboardService.getShortAnouncments();

  }

  @Get('education')
  async getEducationContent() {
   return this.DashboardService.getEducationContent();
  }
}
