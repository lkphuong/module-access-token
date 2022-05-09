import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/modules/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}
  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.accountService.findOne(loginDto);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
