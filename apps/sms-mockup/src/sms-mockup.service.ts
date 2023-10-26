import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsMockupService {
  getHello(): string {
    return 'Hello World!';
  }
}
