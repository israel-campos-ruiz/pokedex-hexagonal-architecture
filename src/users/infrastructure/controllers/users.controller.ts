import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersCreationService } from '../../application/services/users-creation-.service';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UsersFindAllService } from 'src/users/application/services/users-find-all.service';
import { FindOneService } from 'src/users/application/services/find-one.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersCreationService: UsersCreationService,
    private readonly usersFindAllService: UsersFindAllService,
    private readonly usersFindOneService: FindOneService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersCreationService.process(createUserDto);
  }
  @Get()
  getAllUsers() {
    return this.usersFindAllService.process();
  }
  @Get(':term')
  getUserByTerm(@Param('term') term: any) {
    return this.usersFindOneService.process(term);
  }
}
