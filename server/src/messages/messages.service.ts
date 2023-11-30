import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }

  findAll() {}

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
