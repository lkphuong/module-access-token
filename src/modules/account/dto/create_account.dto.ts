import { IsDefined, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsDefined({ message: 'Tên đăng nhập không được để trống' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @IsString({ message: 'Tên đăng nhập phải là chuỗi' })
  readonly username: string;

  @IsDefined({ message: 'Mật khẩu không được để trống' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 kí tự' })
  readonly password: string;
}
