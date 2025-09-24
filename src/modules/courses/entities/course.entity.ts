import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Chapter,
  ChapterSchema,
} from 'src/modules/chapter/entities/chapter.entity';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [ChapterSchema], default: [] })
  chapters: Chapter[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// index để search
CourseSchema.index({ title: 'text', description: 'text' });
