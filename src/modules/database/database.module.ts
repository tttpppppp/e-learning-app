import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/entities/user.entity';
import {
  VerificationToken,
  VerificationTokenSchema,
} from '../verify-token/entities/verify.entity';
import { Course, CourseSchema } from '../courses/entities/course.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: VerificationToken.name, schema: VerificationTokenSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
