import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConversatonModule } from './conversaton/conversaton.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './lib/prisma/prisma.service';
import { PrismaModule } from './lib/prisma/prisma.module';
import { ChatGateway } from './message/message.gataway';
import { MessageService } from './message/message.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ConversatonModule,
    MessageModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageService, ChatGateway],
})
export class AppModule {}
