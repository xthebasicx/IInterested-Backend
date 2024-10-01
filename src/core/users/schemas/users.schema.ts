import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  user_name: string;

  @Prop()
  user_password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Note' }] })
  notes: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);