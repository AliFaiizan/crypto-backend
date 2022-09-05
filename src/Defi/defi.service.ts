import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DefiProject, DefiProjectDocument } from './defi.schema';

@Injectable()
export class DefiService {
  constructor(
    @InjectModel(DefiProject.name)
    private readonly DefiProjectModel: Model<DefiProjectDocument>,
  ){}

  async getDefiProjects() {

    return this.DefiProjectModel.find()

  }
}
