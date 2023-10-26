import { RabbitMQService } from '@app/_common/rabbitmq-config/rabbitmq.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { getEmailMsg } from '@app/_common/auth/mail-msg';

@Injectable()
export class SmsConsumerService implements OnModuleInit {
	private isConnected: boolean = false;
	constructor(
		private readonly rabbitmqService: RabbitMQService,
	) { }

	onModuleInit(): void {
		console.log('>>>>>>>> prot 3002');
		this.startConsuming();
	}

	async startConsuming(): Promise<void> {
		try {
			await this.rabbitmqService.connect();
			this.isConnected = true;
			// let notificationPayload
			await this.rabbitmqService.consumeMessages('mobile_sms_queue', async (message) => {
				const msg = JSON.parse(message);
				console.log('>>>>>>>> sms', msg.content);
			});
		} catch (error) {
			console.log('>>>>>>>> startConsuming', error);
			this.isConnected = false;
			setTimeout(() => this.startConsuming(), 5000);
			// throw error
		}
	}
}