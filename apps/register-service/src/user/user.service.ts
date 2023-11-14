import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserInput } from './input/register.input';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginInput } from './input/login.input';
import { RabbitMQService } from '@app/_common/rabbitmq-config/rabbitmq.service';
import { ErrorCodeEnum } from '@app/_common/exceptions/error-code.enum';
import { BaseHttpException } from '@app/_common/exceptions/base-http-exception';
import { TokenPayload } from '@app/_common/auth/auth-token-payload.interface';


@Injectable()
export class UserService implements OnModuleInit {

  constructor(private readonly rabbitmqService: RabbitMQService) { }

  onModuleInit(): void {
    console.log('>>>>>>>> prot 3001');
    this.rabbitmqService.connect();
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const hashPassword = await bcrypt.hash(input.password, 12);
    const user = await User.query().insert(
      {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: hashPassword
      });
    const payload = JSON.stringify({
      userId: user.id,
      parentId: user.id,
      content: "1234",
      NotifyType: "otp",
      email: user.email,
    });
    if (input.verifyType === 'otp')
      // mail
      await this.rabbitmqService.publishMessage(payload, "otp", "mail_notifications_queue");
    else
      // sms
      await this.rabbitmqService.publishMessage(payload, "sms", "mobile_sms_queue");
    return user;
  }

  async login(input: LoginInput) {
    const user = await User.query().findOne({ email: input.email });
    if (!(user.password && (await bcrypt.compare(input.password, user.password))))
      throw new BaseHttpException(ErrorCodeEnum.INCORRECT_PASSWORD);
    const payload: TokenPayload = { userId: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
    return {
      user,
      accessToken
    };
  }

  async sendMessageInQueueWithPriority2() {
    // for (let i = 0; i < 100; i++) {
    // await this.rabbitmqService.publishMessage(`this message number ${i} with priority 2`, "otp", "test-queue", 2);
    // }
    await this.rabbitmqService.publishMessage(`this message with priority 2`, "test", "test-queue", 2);
    await this.rabbitmqService.getQueueLength('test-queue')
    console.log('this message with priority 2');
  }

  async sendMessageInQueueWithPriority1() {
    await this.rabbitmqService.publishMessage(`this message with priority 1`, "test", "test-queue", 1);
    console.log('this message with priority 1');
  }
}