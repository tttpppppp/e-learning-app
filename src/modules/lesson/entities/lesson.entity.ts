import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema()
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop()
  videoUrl: string;

  @Prop()
  duration: number; // phút
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
