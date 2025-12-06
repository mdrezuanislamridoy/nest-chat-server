import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '@/lib/guards/auth.guard';
import { CurrentUser } from '@/lib/decorators/user.decorator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Body()
    body: {
      conversationId: string;
      senderId: string;
      message: string;
    },
    @CurrentUser() user: { sub: string; email: string },
  ) {
    return this.messageService.sendMessage(body, user.sub);
  }

  @Get('get-messages')
  @UseGuards(JwtAuthGuard)
  async getMessages(
    @Body() body: { conversationId: string },
    @CurrentUser() user: { sub: string; email: string },
  ) {
    return this.messageService.getMessages(body.conversationId, user.sub);
  }

  @Get('get-conversation-participants')
  @UseGuards(JwtAuthGuard)
  async getConversation(conversationId:string) {
    return this.messageService.getConversationParticipants(conversationId);
  }
}
