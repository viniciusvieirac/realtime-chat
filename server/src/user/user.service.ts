import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  sub: string;
}
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    if (
      !createUserDto.name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new ConflictException('Name, Email and Password are required');
    }
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

  public async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    return user;
  }

  public async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return {
      ...user,
      password: undefined,
    };
  }

  async getUserProfileByToken(token: string) {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as JwtPayload;
      const user = await this.findById(Number(decodedToken.sub));
      const userProfile = {
        ...user,
      };

      return userProfile;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
