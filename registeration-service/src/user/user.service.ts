import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './input/register.input';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginInput } from './input/login.input';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { TokenPayload } from 'src/_common/auth/auth-token-payload.interface';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { RabbitMQService } from 'src/_common/rabbitmq/rabbitmq.service';


@Injectable()
export class UserService {

  constructor(private readonly rabbitmqService: RabbitMQService) { }

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
      content: "Registeration Code : 1234",
      NotifyType: "otp",
    });
    await this.rabbitmqService.publishMessage(payload, "otp", "mail_notifications_queue");
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

}