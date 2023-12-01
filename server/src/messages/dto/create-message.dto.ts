export class CreateMessageDto {
  content: string;
  imageUrl?: string;
  senderId: number;
  recipientId: number;
}
