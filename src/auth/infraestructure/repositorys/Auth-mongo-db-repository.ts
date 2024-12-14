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
import { findUserByEmail, updateUserOtp } from '../mongoDbQuerys/Mongo-querys';

export class AuthMongoRepository implements BaseAuthRepository<any> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByEmail(params: { email: string }): Promise<UserDomain> {
    const database = this.userModel.db.db;
    const response = await findUserByEmail(database, params);

    return response;
  }
  async signLocal(params: {
    email: string;
    password: string;
  }): Promise<UserDomain> {
    const response = this.findByEmail(params);
    return response;
  }
  async createOtp(user: UserDomain): Promise<UserDomain> {
    console.log(user);
    const database = this.userModel.db.db;
    const updatedUser = await updateUserOtp({
      db: database,
      args: user,
    });
    return updatedUser as any;
  }

  // async signOtp(params: any): Promise<UserDomain> {
  //   const database = this.userModel.db.db;
  //   const response = await findUserByEmail(database, params);
  //   console.log(response);
  //   await updateUserOtp({ db: database, entity: params });
  //   return response;
  // }
}
