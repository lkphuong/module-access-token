import { CACHE_MANAGER, Inject, Injectable, Request } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AccountService } from 'src/modules/account/account.service';
import { UnauthorizedException } from 'src/common/exceptions/index.exception';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private accountService: AccountService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // find user cache?
    const value = await this.cacheManager.get(payload._id);
    if (value) return value;
    const account = await this.accountService.findById(payload._id);

    if (!account) {
      throw new UnauthorizedException(1002, 'Invalid Token');
    }

    return account;
  }
}
