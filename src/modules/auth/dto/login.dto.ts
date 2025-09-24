import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'despacitovv@gmail.com',
    description: 'Email người dùng',
  })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @ApiProperty({ example: '123456', description: 'Mật khẩu người dùng' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
