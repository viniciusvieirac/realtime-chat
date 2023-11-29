import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 10),
    };
    const createdUser = await this.prisma.user.create({ data: data });
    return {
      ...createdUser,
      password: undefined,
    };
  }
}
