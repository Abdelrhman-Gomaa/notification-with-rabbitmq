import { Controller, Get } from '@nestjs/common';
import { SmsMockupService } from './sms-mockup.service';

@Controller()
export class SmsMockupController {
  constructor(private readonly smsMockupService: SmsMockupService) {}

  @Get()
  getHello(): string {
    return this.smsMockupService.getHello();
  }
}
