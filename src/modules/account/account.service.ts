import { Injectable } from '@nestjs/common';
import { AccountRepository } from './respositories/account.respository';
import { LoginDto } from 'src/auth/dto/login.dto';
import { CreateAccountDto } from './dto';
@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findOne(loginDto: LoginDto) {
    return await this.accountRepository.login(loginDto);
  }

  async findById(id: string) {
    return await this.accountRepository.findByID(id);
  }

  async create(createAccountDto: CreateAccountDto) {
    return await this.accountRepository.createAccount(createAccountDto);
  }

  // update and save access token
  async updateAccessToken(id: string, accessToken: string) {
    return this.accountRepository.updateAccessToken(id, accessToken);
  }

  async checkDevice(token: string) {
    return this.accountRepository.checkAccessToken(token);
  }
}
