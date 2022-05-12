import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/common/enums/action.anum';
import { Account } from 'src/modules/account/schema/account.schema';
type Subjects = InferSubjects<typeof Account> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class CaslAbilityFactory {
  createForAccount(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    if (account.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      cannot(Action.Read, Account).because('your special message: Only admin');
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
