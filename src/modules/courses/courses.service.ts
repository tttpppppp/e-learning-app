import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AlreadyExistsException } from 'src/core/exception/AlreadyExistsException';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(dto: CreateCourseDto): Promise<Course> {
    const findCourse = await this.courseModel
      .findOne({ title: dto.title })
      .exec();
    if (findCourse)
      throw new AlreadyExistsException(`Course ${dto.title} already exists`);
    const course = new this.courseModel(dto);
    return course.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().sort({ createdAt: -1 }).lean().exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) throw new NotFoundException(`Course ${id} not found`);
    return course;
  }

  async update(id: string, dto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!course) throw new NotFoundException(`Course ${id} not found`);
    return course;
  }

  async remove(id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Course ${id} not found`);
  }
}
