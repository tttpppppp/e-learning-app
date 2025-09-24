import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Course } from 'src/modules/courses/entities/course.entity';
import { User } from 'src/modules/users/entities/user.entity';

export type EnrollmentDocument = HydratedDocument<Enrollment>;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  course: Types.ObjectId;

  @Prop({ default: Date.now })
  enrolledAt: Date;

  @Prop({ default: 0 })
  progress: number; // %

  @Prop({ enum: ['active', 'expired'], default: 'active' })
  status: string;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
