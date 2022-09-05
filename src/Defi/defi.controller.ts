import { Controller, Get } from '@nestjs/common';
import { DefiService } from './defi.service';

@Controller('defi')
export class DefiController {

    constructor(private readonly DefiService:DefiService){

    }

    @Get('/')
    async getDefiProjects(){
        return this.DefiService.getDefiProjects()
    }

}
