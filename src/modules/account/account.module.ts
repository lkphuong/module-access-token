import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountProvider } from './provider/account.provider';
import { AccountRepository } from './respositories/account.respository';

@Module({
  imports: [MongooseModule.forFeatureAsync([AccountProvider])],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountService],
})
export class AccountModule {}
