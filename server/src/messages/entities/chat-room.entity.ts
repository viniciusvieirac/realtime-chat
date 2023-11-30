import { User } from 'src/user/entities/user.entity';
import { Message } from './message.entity';

export class ChatRoom {
  id?: number;
  name: string;
  createdAt: Date;
  users: User[];
  messages: Message[];
}
