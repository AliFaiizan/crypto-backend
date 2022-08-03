import { Injectable } from '@nestjs/common';

@Injectable({})
export class DashboardService {
  constructor() {}

  async getDashboard() {
    return {
      message: 'dashboard data',
    };
  }

  async getRules() {

    
    return {
      message: 'rules',
    };
  }

  async getTradingPatterns() {
    return {
      message: 'trading patterns',
    };
  }

  async getShortAnouncments() {
    return {
      message: 'short anouncments',
    };
  }

  
  async getEducationContent() {
    return {
      message: 'education content',
    };
  }
}
