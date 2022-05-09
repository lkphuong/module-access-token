import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Account } from 'src/modules/account/schema/account.schema';
type Subjects = InferSubjects<typeof Account> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
@Injectable()
export class CaslAbilityFactory {
  createForAccount(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.isAdmin) {
      can(Action.Manage, 'all').because('manage');
    } else {
      can(Action.Read, Account).because('error cals');
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
