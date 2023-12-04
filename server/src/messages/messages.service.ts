import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    const { email, ...messageData } = createMessageDto;

    const userId = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    const message = await this.prisma.message.create({
      data: {
        ...messageData,
        sender: { connect: { id: userId.id } },
        createdAt: new Date(),
      },
    });

    return message;
  }

  async findAllMessages() {
    const allMessagess = await this.prisma.message.findMany();
    return allMessagess;
  }
}
