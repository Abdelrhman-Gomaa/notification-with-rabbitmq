import { Module } from '@nestjs/common';
import { MailConsumerService } from './mail-consumer.service';
import { RabbitmqModule } from '@app/_common/rabbitmq-config/rabbitmq.module';
import { MailModule } from '../mail/mail.module';

@Module({
	imports: [
		RabbitmqModule,
		MailModule
	],
	providers: [MailConsumerService],
	exports: [
		MailConsumerService,
	]
})
export class ConsumersModule { }
