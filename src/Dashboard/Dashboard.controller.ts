import { Controller, Get, Injectable } from '@nestjs/common';
;

@Controller('Dashboard')
export class DashboardController {

    constructor() { }

    @Get()
    async getDashboard() {

        return {
            message: 'dashboard data'
        };
    }

    @Get('rules')    
    async getRules() {
            
            return {
                message: 'rules'
            };
    }

    @Get('tradingPatterns')
    async getTradingPatterns() {
        return {
            message: 'trading patterns'
        };
    }

    @Get('shortAnouncments')
    async getShortAnouncments() {
        return {
            message: 'short anouncments'
        };
    }

}
