import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AccountService } from 'src/modules/account/account.service';
import { UnauthorizedException } from 'src/common/exceptions/index.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const account = await this.accountService.findById(payload._id);

    if (!account) {
      throw new UnauthorizedException(
        1001,
        'Cần phải đăng nhập trước khi gọi request',
      );
    }

    return account;
  }
}
