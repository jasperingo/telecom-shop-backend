import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  ExtractSubjectType,
} from '@casl/ability';
import Brand from '../models/Brand';
import Photo from '../models/Photo';
import Product from '../models/Product';
import ProductUnit from '../models/ProductUnit';
import Transaction from '../models/Transaction';
import User from '../models/User';

/*eslint-disable */
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  ReadOne = 'read_one',
}

export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Product
      | typeof Photo
      | typeof Brand
      | typeof ProductUnit
      | typeof Transaction
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export const PermissionBuilder = (user: User) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    Ability as AbilityClass<AppAbility>,
  );

  can(
    [Action.Update, Action.ReadOne], 
    User, 
    ['firstName', 'lastName', 'email', 'phoneNumber', 'password'], 
    { id: user.id }
  );

  can(
    [Action.Read, Action.ReadOne], 
    User, 
    ['firstName', 'lastName', 'phoneNumber'], 
    { referralId: user.id }
  );

  can([Action.Read, Action.ReadOne], [Product, ProductUnit]);

  can(Action.Create, Transaction);
  
  can(Action.Update, Transaction, ['status'], { userId: user.id });

  can([Action.Read, Action.ReadOne], Transaction, { userId: user.id });

  if (user.admin) {
    can(Action.Update, Product);

    can(Action.Manage, [Photo, Brand]);

    can([Action.Update, Action.Create], ProductUnit);
    
    can([Action.Read, Action.ReadOne], Transaction);

    can([Action.Read, Action.ReadOne], User);
    
    can(Action.Update, User, ['status'], { id: { $ne: user.id } });
  }

  if (user.admin && user.adminRole === User.ADMIN_ROLE_SUPER) {
    can(Action.Update, User, ['admin'], { id: { $ne: user.id } });
  }

  if (user.status === User.STATUS_DEACTIVATED || !user.emailVerified) {
    cannot(Action.Manage, 'all');
  }

  return build({
    detectSubjectType: (item) =>
      item.constructor as ExtractSubjectType<Subjects>,
  });
};
