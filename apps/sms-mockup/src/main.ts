import { NestFactory } from '@nestjs/core';
import { SmsMockupModule } from './sms-mockup.module';

async function bootstrap() {
  const app = await NestFactory.create(SmsMockupModule);
  await app.listen(3002);
}
bootstrap();
