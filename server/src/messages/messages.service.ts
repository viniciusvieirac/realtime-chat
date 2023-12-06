import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }
  async create(createMessageDto: CreateMessageDto) {
    const { email, imageUrl, ...messageData } = createMessageDto;

    let image = null;
    if (imageUrl) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: 'chatApp',
      });

      image = uploadedImage.secure_url;
    }

    const userId = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    const message = await this.prisma.message.create({
      data: {
        ...messageData,
        imageUrl: image,
        sender: { connect: { id: userId.id } },
        createdAt: new Date(),
      },
    });

    return message;
  }

  async findAllMessagesWithUsers() {
    const allMessagesWithUsers = await this.prisma.message.findMany({
      include: {
        sender: {
          select: {
            name: true,
          },
        },
      },
    });

    return allMessagesWithUsers;
  }
}
