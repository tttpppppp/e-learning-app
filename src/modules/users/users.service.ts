import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ResponsePagination } from 'src/core/response/responseUser';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(
    page: number,
    size: number,
    search: string,
    sortBy: string,
    type: string,
  ): Promise<ResponsePagination<User>> {
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy || 'createdAt'] = type === 'asc' ? 1 : -1;
    const searchBy = search ? { email: { $regex: search, $options: 'i' } } : {};
    const [listUser, totalItems] = await Promise.all([
      this.userModel
        .find(searchBy)
        .skip((page - 1) * size)
        .limit(size)
        .sort(sort)
        .lean()
        .exec(),
      this.userModel.countDocuments().exec(),
    ]);
    const totalPages = Math.ceil(totalItems / size);
    return new ResponsePagination(totalItems, totalPages, page, size, listUser);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
