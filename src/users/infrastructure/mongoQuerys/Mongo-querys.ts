import { Db, Collection } from 'mongodb';
import { UserDomain } from 'src/users/domain/entities/user.domain';

export const createUserQuery = async (db: Db, entity: UserDomain) => {
  const userCollection: Collection = db.collection('users');
  await userCollection.insertOne(entity);
  return entity;
};

export const findAllUsers = async (db: Db) => {
  const userCollection = db.collection('users');
  const response = await userCollection
    .aggregate([
      {
        $lookup: {
          from: 'pokemons',
          localField: 'pokemon',
          foreignField: 'no',
          as: 'pokemon',
        },
      },
    ])
    .toArray();
  return response as unknown as UserDomain[];
};
export const findUserByEntityParams = async (db: Db, term: string) => {
  const userCollection = db.collection('users');
  const query = [
    {
      $match: {
        $or: [
          term ? { userId: term } : null,
          term ? { email: term } : null,
          term ? { name: term } : null,
        ].filter(Boolean),
      },
    },
    {
      $lookup: {
        from: 'pokemons',
        localField: 'pokemon',
        foreignField: 'no',
        as: 'pokemon',
      },
    },
    {
      $project: {
        password: 0,
      },
    },
  ];
  const response = await userCollection.aggregate(query).toArray();
  return response as unknown as UserDomain;
};

export const updateUser = async () => {};

export const deleteUser = () => {};
