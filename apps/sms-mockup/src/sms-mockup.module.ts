import { Module } from '@nestjs/common';
import { SmsMockupController } from './sms-mockup.controller';
import { SmsMockupService } from './sms-mockup.service';
import { ConsumersModule } from './consumers/consumers.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from '@app/_common/rabbitmq-config/rabbitmq.module';

@Module({
  imports: [
    ConsumersModule,
    RabbitmqModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [SmsMockupController],
  providers: [SmsMockupService],
})
export class SmsMockupModule { }
