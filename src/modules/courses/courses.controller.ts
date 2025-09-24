import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Course } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { ResponseData } from 'src/core/response/responseData';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Post()
  async create(@Body() dto: CreateCourseDto): Promise<ResponseData<Course>> {
    const course = await this.courseService.create(dto);
    return new ResponseData(
      course,
      'Course created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  async findAll(): Promise<ResponseData<Course[]>> {
    const courses = await this.courseService.findAll();
    return new ResponseData(
      courses,
      'Courses retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData<Course>> {
    const course = await this.courseService.findOne(id);
    return new ResponseData(
      course,
      'Course retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
  ): Promise<ResponseData<Course>> {
    const course = await this.courseService.update(id, dto);
    return new ResponseData(
      course,
      'Course updated successfully',
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseData<null>> {
    await this.courseService.remove(id);
    return new ResponseData(null, 'Course deleted successfully', HttpStatus.OK);
  }
}
