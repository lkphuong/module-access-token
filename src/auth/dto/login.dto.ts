import { IsDefined, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsDefined({ message: 'Username không được để trống' })
  @IsNotEmpty({ message: 'Username không được để trống' })
  readonly username: string;

  @IsDefined({ message: 'Password không được để trống' })
  @IsNotEmpty({ message: 'Password không được để trống' })
  readonly password: string;
}
