import { Controller, Post, Body } from '@nestjs/common';
import { UsersCreationService } from '../../application/services/users-creation-.service';
import { CreateUserDto } from '../../domain/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersCreationService: UsersCreationService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UsersCreationService.process(createUserDto);
  }
}
