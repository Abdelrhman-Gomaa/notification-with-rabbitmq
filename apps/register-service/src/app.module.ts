import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from '@app/_common/rabbitmq-config/rabbitmq.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    RabbitmqModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
