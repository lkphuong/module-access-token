import {
  UseGuards,
  Controller,
  Post,
  Request,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt_auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local_auth.guard';
import { Public } from 'src/common/decorators/auth/public.decoration';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { Cache } from 'cache-manager';
import { PoliciesGuard } from 'src/common/guards/ability.guard';
import {
  CheckPolicies,
  ReadMyProfilePolicyHandler,
} from 'src/common/decorators/ability/ability.decoration';
import { AppAbility } from 'src/ability/casl-ability.factory';
import { Account } from 'src/modules/account/schema/account.schema';
import { Action } from 'src/common/enums/action.anum';
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    const access_token = await this.authService.login(req.user);
    return new ResponseHelper().success(access_token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }

  @Get('cals')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new ReadMyProfilePolicyHandler())
  findAll() {
    return new ResponseHelper().success('casl success');
  }
}
