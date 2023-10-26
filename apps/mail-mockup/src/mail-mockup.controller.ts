import { Controller, Get } from '@nestjs/common';
import { MailMockupService } from './mail-mockup.service';

@Controller()
export class MailMockupController {
  constructor(private readonly mailMockupService: MailMockupService) {}

  @Get()
  getHello(): string {
    return this.mailMockupService.getHello();
  }
}
