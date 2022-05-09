import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from '../schema/account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync } from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { CreateAccountDto } from '../dto';
import { NotFoundException } from 'src/common/exceptions/not_found.exception';
import { BadRequestException } from 'src/common/exceptions/bad_request.exception';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<AccountDocument>,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findByID(id: string): Promise<Account> {
    return await this.accountModel.findById(id);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const account = await this.accountModel
      .findOne({ username: loginDto.username })
      .select('+password');
    if (!account) throw new NotFoundException(3006, 'Người dùng không tồn tại');
    const isMatch = compareSync(loginDto.password, account.password);

    if (!isMatch)
      throw new BadRequestException(
        3006,
        'Username hoặc mật khẩu không chính xác',
      );
    return {
      _id: account._id,
      username: account.username,
    };
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    const account = await this.accountModel.findOne({
      username: createAccountDto.username,
    });
    if (account) throw new NotFoundException(3003, 'Người dùng đã tồn tại');
    return await this.accountModel.create(createAccountDto);
  }
}
