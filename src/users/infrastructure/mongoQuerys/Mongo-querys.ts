import { Db, Collection } from 'mongodb';
import { UserDomain } from 'src/users/domain/entities/user.domain';

export const createUserQuery = async (db: Db, entity: UserDomain) => {
  const userCollection: Collection = db.collection('users');
  await userCollection.insertOne(entity);
  return entity;
};
