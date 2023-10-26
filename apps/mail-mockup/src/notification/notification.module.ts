import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { DatabaseModule } from '@app/_common/database/database.module';
import { RabbitmqModule } from '@app/_common/rabbitmq-config/rabbitmq.module';

@Module({
  imports: [DatabaseModule, RabbitmqModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
  ],
  exports: [
    NotificationService,
  ]
})
export class NotificationModule { }
