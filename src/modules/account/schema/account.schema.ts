import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type AccountDocument = Account & Document;

const { ObjectId } = Types;

@Schema()
export class Account {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true, minlength: 6, select: false })
  password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
