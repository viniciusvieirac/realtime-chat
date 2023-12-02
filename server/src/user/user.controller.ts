import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Get()
  findByEmail(@Body('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @IsPublic()
  @Get('user/data')
  async findByToken(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }
    const token = authHeader.split(' ')[1];

    const userProfile = await this.userService.getUserProfileByToken(token);

    return userProfile;
  }
}
