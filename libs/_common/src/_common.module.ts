import { Module } from '@nestjs/common';
import { CommonService } from './_common.service';
import { RabbitmqModule } from './rabbitmq-config/rabbitmq.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [RabbitmqModule, DatabaseModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
