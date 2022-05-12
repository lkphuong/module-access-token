import { SetMetadata } from '@nestjs/common';
import {
  AppAbility,
  CaslAbilityFactory,
} from 'src/ability/casl-ability.factory';
import { Action } from 'src/common/enums/action.anum';
import { Account } from 'src/modules/account/schema/account.schema';
interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);

export class ReadMyProfilePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Account);
  }
}
