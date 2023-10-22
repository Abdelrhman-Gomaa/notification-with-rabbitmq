import { RabbitmqModule } from './../_common/rabbitmq/rabbitmq.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/_common/database/database.module';

@Module({
  imports: [DatabaseModule, RabbitmqModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
