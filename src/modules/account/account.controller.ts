import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/auth/public.decoration';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto';
import { Account } from './schema/account.schema';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Public()
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.create(createAccountDto);
  }
}
