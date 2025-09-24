import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Lesson,
  LessonSchema,
} from 'src/modules/lesson/entities/lesson.entity';

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [LessonSchema], default: [] })
  lessons: Lesson[];
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
