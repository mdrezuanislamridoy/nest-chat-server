import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConversatonService } from './conversaton.service';
import { JwtAuthGuard } from '@/lib/guards/auth.guard';
import { CurrentUser } from '@/lib/decorators/user.decorator';

@Controller('conversaton')
export class ConversatonController {
  constructor(private readonly conversatonService: ConversatonService) {}
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createConversation(
    @Body() body: { senderId: string; receiverId: string },
  ) {
    return this.conversatonService.createConversation(body);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getConversation(
    @Param('id') id: string,
    @CurrentUser() user: { sub: string; email: string },
  ) {
    return this.conversatonService.getConversation(id, user.sub);
  }

  
}
