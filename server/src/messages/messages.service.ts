import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    const { senderId, recipientId, ...messageData } = createMessageDto;

    const senderExists = await this.prisma.user.findUnique({
      where: { id: senderId },
    });

    const recipientExists = await this.prisma.user.findUnique({
      where: { id: recipientId },
    });

    if (!senderExists || !recipientExists) {
      throw new Error('Remetente ou destinatário não encontrado.');
    }

    const message = await this.prisma.message.create({
      data: {
        ...messageData,
        sender: { connect: { id: senderId } },
        recipient: { connect: { id: recipientId } },
        createdAt: new Date(),
      },
    });

    return message;
  }

  async findAllMessages(userId: number, messageType: 'sent' | 'received') {
    try {
      const messages = await this.prisma.message.findMany({
        where:
          messageType === 'sent'
            ? { senderId: userId }
            : { recipientId: userId },
        select: {
          id: true,
          content: true,
          imageUrl: true,
          createdAt: true,
          sender: {
            select: {
              id: true,
              name: true,
            },
          },
          recipient: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return messages;
    } catch (error) {
      throw new Error(
        `Erro ao buscar as mensagens ${
          messageType === 'sent' ? 'enviadas' : 'recebidas'
        }: ${error.message}`,
      );
    }
  }
}
