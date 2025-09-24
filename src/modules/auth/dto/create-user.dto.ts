/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'despacitovv@gmail.com',
    description: 'Email người dùng',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'trantienphuc123', description: 'Tên người dùng' })
  username: string;
  @ApiProperty({ example: '123456', description: 'Mật khẩu người dùng' })
  @IsNotEmpty()
  password: string;
}
