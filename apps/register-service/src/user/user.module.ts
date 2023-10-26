import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@app/_common/database/database.module';
import { RabbitmqModule } from '@app/_common/rabbitmq-config/rabbitmq.module';

@Module({
  imports: [DatabaseModule, RabbitmqModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
