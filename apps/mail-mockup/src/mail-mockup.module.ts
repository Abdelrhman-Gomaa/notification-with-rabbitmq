import { NotificationModule } from './notification/notification.module';
import { Module } from '@nestjs/common';
import { MailMockupController } from './mail-mockup.controller';
import { MailMockupService } from './mail-mockup.service';
import { RabbitmqModule } from '@app/_common/rabbitmq-config/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { ConsumersModule } from './consumers/consumers.module';

@Module({
  imports: [
    ConsumersModule,
    NotificationModule,
    MailModule,
    RabbitmqModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [MailMockupController],
  providers: [MailMockupService],
})
export class MailMockupModule { }
