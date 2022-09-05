import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DefiController } from './defi.controller';
import { DefiProject, DefiProjectSchema } from './defi.schema';
import { DefiService } from './defi.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DefiProject.name, schema: DefiProjectSchema }]),
  ],
  controllers: [DefiController],
  providers: [DefiService],
})
export class DefiModule {}
