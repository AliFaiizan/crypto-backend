import { Controller, Get, Injectable } from '@nestjs/common';
import { ArticalsService } from './articals.service';

@Controller('Articals')
export class ArticalsController {
  constructor(private readonly ArticalsService: ArticalsService) {}

 
}
