import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/core/users/schemas/users.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  note_name: string;

  @Prop()
  note_details: string;

  @Prop({type:Types.ObjectId,ref:'User',required:true})
  user:Types.ObjectId
}
export const NoteSchema = SchemaFactory.createForClass(Note);
