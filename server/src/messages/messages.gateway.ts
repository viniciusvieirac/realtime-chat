import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = this.messagesService.create(createMessageDto);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  async handleFindAllMessages() {
    const messages = await this.messagesService.findAllMessagesWithUsers();
    this.server.emit('allMessages', messages);
  }
}
