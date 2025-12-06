import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ConversatonService {
  constructor(private prisma: PrismaService) {}
  async createConversation(body: { senderId: string; receiverId: string }) {
    const { senderId, receiverId } = body;

    const isConversation = await this.prisma.client.conversation.findFirst({
      where: {
        conversationType: 'direct',
        participents: {
          every: {
            userId: {
              in: [senderId, receiverId],
            },
          },
        },
      },
      include: {
        participents: {
          include: { sender: true },
        },
      },
    });

    if (isConversation) {
      return { conversation: isConversation };
    }

    const conversation = await this.prisma.client.conversation.create({
      data: {
        conversationType: 'direct',
        participents: {
          create: [
            {
              userId: senderId,
            },
            {
              userId: receiverId,
            },
          ],
        },
      },
    });

    return {
      conversation: conversation,
      message: 'conversation created successfully',
    };
  }

  async getConversation(id: string, userId: string) {
    const participant = await this.prisma.client.participant.findFirst({
      where: {
        userId: userId,
        conversationId: id,
      },
    });

    if (!participant) {
      throw new NotFoundException('Access denied');
    }

    const conversation = await this.prisma.client.conversation.findUnique({
      where: { id },
      include: {
        participents: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const receiver = conversation.participents.find(
      (p) => p.userId !== userId,
    )?.sender;

    return {
      conversationId: conversation.id,
      receiver,
      messages: conversation.messages,
    };
  }
}
