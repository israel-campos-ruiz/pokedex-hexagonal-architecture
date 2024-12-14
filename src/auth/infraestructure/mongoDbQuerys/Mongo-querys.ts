import { Db, Collection } from 'mongodb';
import { UserDomain } from 'src/users/domain/entities/user.domain';

export const findUserByEmail = async (
  db: Db,
  entity: { email: string; password?: string },
) => {
  const userCollection: Collection = db.collection('users');
  const userResponse = userCollection.findOne({ email: entity.email });
  return userResponse as unknown as UserDomain;
};

export const updateUserOtp = async ({
  db,
  args,
}: {
  db: Db;
  args: UserDomain;
}) => {
  const userCollection: Collection = db.collection('users');
  const query = {
    otp: args.otp,
    expiresAt: args.otpExpiresAt,
  };
  await userCollection.updateOne({ email: args.email }, { $set: query });
  return args;
};
