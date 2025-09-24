import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseData } from 'src/core/response/responseData';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponsePagination } from 'src/core/response/responseUser';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'student')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number, default is 1',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    description: 'Page size, default is 10',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by email, default is empty',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Sort by createdAt, default is createdAt',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: 'Sort type, asc or desc, default is desc',
  })
  async findAll(
    @Query('page') page = '1',
    @Query('size') size = '10',
    @Query('search') search = '',
    @Query('sortBy') sortBy = 'createdAt',
    @Query('type') type = 'desc',
  ): Promise<ResponseData<ResponsePagination<User>>> {
    const pageNumber = Number(page) || 1;
    const sizeNumber = Number(size) || 10;
    const listUser = await this.usersService.findAll(
      pageNumber,
      sizeNumber,
      search,
      sortBy,
      type,
    );
    return new ResponseData(listUser, 'Get all users successes', HttpStatus.OK);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
