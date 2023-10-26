import { Injectable } from '@nestjs/common';

@Injectable()
export class MailMockupService {
  getHello(): string {
    return 'Hello World!';
  }
}
