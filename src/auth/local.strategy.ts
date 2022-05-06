import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from 'src/common/exceptions/unauthorized.exception';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const loginDto: LoginDto = {
      username: username,
      password: password,
    };
    const account = await this.authService.validateUser(loginDto);
    if (!account) {
      throw new UnauthorizedException(
        1001,
        'Cần phải đăng nhập trước khi gọi request',
      );
    }

    return account;
  }
}
