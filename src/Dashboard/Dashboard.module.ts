import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './Dashboard.controller';
import { DashboardService } from './Dashboard.service';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
