import { UserDomain } from 'src/users/domain/entities/user.domain';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// import {
//   createUserQuery,
//   findAllUsers,
//   findUserByEntityParams,
// } from '../mongoQuerys/Mongo-querys';
import { BaseAuthRepository } from './Base-auth-repository';
import { User } from 'src/users/infrastructure/entities/User.entity';
import { findUserByEmail } from '../mongoDbQuerys/Mongo-querys';

export class AuthMongoRepository implements BaseAuthRepository<any> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async signLocal(params: {
    email: string;
    password: string;
  }): Promise<UserDomain> {
    const database = this.userModel.db.db;
    const response = await findUserByEmail(database, params);
    return response;
  }
  //   async signOtp(params: UserDomain): Promise<UserDomain> {}
  //   async create(entity: UserDomain): Promise<UserDomain> {
  //     const database = this.userModel.db.db;
  //     await createUserQuery(database, entity);
  //     return entity;
  //   }
  //   async findAll(): Promise<UserDomain[]> {
  //     const database = this.userModel.db.db;
  //     const users = await findAllUsers(database);
  //     return users;
  //   }
  //   async findOne(entity: string): Promise<UserDomain> {
  //     const database = this.userModel.db.db;
  //     const user = await findUserByEntityParams(database, entity);
  //     return user;
  //   }
}
