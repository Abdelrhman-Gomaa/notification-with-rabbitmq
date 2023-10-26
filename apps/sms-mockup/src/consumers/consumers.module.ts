import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@app/_common/rabbitmq-config/rabbitmq.module';
import { SmsConsumerService } from './sms-consumer.service';

@Module({
	imports: [
		RabbitmqModule,
	],
	providers: [SmsConsumerService],
	exports: [
		SmsConsumerService,
	]
})
export class ConsumersModule { }
