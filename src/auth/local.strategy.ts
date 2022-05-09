import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from 'src/common/exceptions/unauthorized.exception';
import { LoginDto } from './dto/login.dto';
import { Cache } from 'cache-manager';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const loginDto: LoginDto = {
      username: username,
      password: password,
    };
    const account = await this.authService.validateUser(loginDto);
    if (!account) {
      throw new UnauthorizedException(1001, 'Invalid Token');
    }
    await this.cacheManager.set(`${account._id}`, account);
    return account;
  }
}
