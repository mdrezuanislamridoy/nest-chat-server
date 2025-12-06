import { Module } from '@nestjs/common';
import { ConversatonService } from './conversaton.service';
import { ConversatonController } from './conversaton.controller';

@Module({
  controllers: [ConversatonController],
  providers: [ConversatonService],
})
export class ConversatonModule {}
