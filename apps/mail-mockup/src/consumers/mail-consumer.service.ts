import { RabbitMQService } from '@app/_common/rabbitmq-config/rabbitmq.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Notification } from '../notification/models/notification.model';
import { MailService } from '../mail/mail.service';
import { getEmailMsg } from '@app/_common/auth/mail-msg';

@Injectable()
export class MailConsumerService implements OnModuleInit {
	private isConnected: boolean = false;
	constructor(
		private readonly rabbitmqService: RabbitMQService,
		private readonly mailService: MailService
	) { }

	onModuleInit(): void {
		console.log('>>>>>>>> prot 3000');
		this.startConsuming();
	}

	async startConsuming(): Promise<void> {
		try {
			await this.rabbitmqService.connect();
			this.isConnected = true;
			// let notificationPayload
			await this.rabbitmqService.consumeMessages('mail_notifications_queue', async (message) => {
				const msg = JSON.parse(message);
				await Notification.query().insert(
					{
						userId: msg?.userId,
						parentId: msg?.parentId,
						content: msg?.content,
						thumbnail: msg?.thumbnail,
						NotifyType: msg?.NotifyType,
						notifyService: 'mail_notifications_queue'
					});
				await this.mailService.send({
					to: msg.email,
					subject: "Registration Code",
					html: getEmailMsg(msg.content),
				});
				console.log('>>>>>>>> ', msg.content);
			});
		} catch (error) {
			console.log('>>>>>>>> startConsuming', error);
			this.isConnected = false;
			setTimeout(() => this.startConsuming(), 5000);
			// throw error
		}
	}
}