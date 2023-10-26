import { NestFactory } from '@nestjs/core';
import { MailMockupModule } from './mail-mockup.module';

async function bootstrap() {
  const app = await NestFactory.create(MailMockupModule);
  await app.listen(3000);
}
bootstrap();
