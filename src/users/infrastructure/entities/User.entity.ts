import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  userId: string;

  @Prop({
    type: [Number],
    default: [],
  })
  pokemon: string[];

  @Prop({ required: false, expires: '5m' })
  otp: number;

  @Prop({ type: Date })
  otpExpiresAt?: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);