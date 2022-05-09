import { Injectable } from '@nestjs/common';
import { Account } from 'src/modules/account/schema/account.schema';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Injectable()
export class AbilityFactory {
  defineAbility(account: Account) {}
}
