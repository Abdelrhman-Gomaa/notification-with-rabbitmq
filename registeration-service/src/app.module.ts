import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RabbitmqModule } from './_common/rabbitmq/rabbitmq.module';
import { DatabaseModule } from './_common/database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    RabbitmqModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
