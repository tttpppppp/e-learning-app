import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Course } from 'src/modules/courses/entities/course.entity';
import { User } from 'src/modules/users/entities/user.entity';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({
    type: [
      {
        course: { type: Types.ObjectId, ref: Course.name },
        price: Number,
      },
    ],
    default: [],
  })
  courses: { course: Types.ObjectId; price: number }[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  })
  paymentStatus: string;

  @Prop({
    enum: ['cod', 'momo', 'paypal', 'credit_card'],
    required: true,
  })
  paymentMethod: string;

  @Prop()
  paidAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
