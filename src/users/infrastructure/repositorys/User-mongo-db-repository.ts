import { UserDomain } from 'src/users/domain/entities/user.domain';
import { BaseUserRepository } from './Base-user-respository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/User.entity';
import {
  createUserQuery,
  findAllUsers,
  findUserByEntityParams,
} from '../mongoQuerys/Mongo-querys';

export class UserMongoRepository implements BaseUserRepository<UserDomain> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(entity: UserDomain): Promise<UserDomain> {
    const database = this.userModel.db.db;
    await createUserQuery(database, entity);
    return entity;
  }
  async findAll(): Promise<UserDomain[]> {
    const database = this.userModel.db.db;
    const users = await findAllUsers(database);
    return users;
  }
  async findOne(entity: string): Promise<UserDomain> {
    const database = this.userModel.db.db;
    const user = await findUserByEntityParams(database, entity);
    return user;
  }
}
