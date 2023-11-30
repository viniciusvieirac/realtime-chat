import { User } from '../../user/entities/user.entity';
import { ChatRoom } from '../entities/chat-room.entity';

export class Message {
  id?: number;
  content: string;
  imageUrl: string;
  userId: number;
  chatRoomId: number;
  createdAt: Date;
  user: User;
  chatRoom: ChatRoom;
}
