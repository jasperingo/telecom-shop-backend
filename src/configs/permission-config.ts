import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  ExtractSubjectType,
} from '@casl/ability';
import User from '../models/User';

/*eslint-disable */
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  ReadList = 'read_list',
}

export type Subjects =
  | InferSubjects<
      | typeof User
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export const PermissionBuilder = (user: User) => {
  const { can, build } = new AbilityBuilder<AppAbility>(
    Ability as AbilityClass<AppAbility>,
  );

  can(Action.Update, User, { id: user.id });
  // can(Action.ReadList, Product);
  // can([Action.Read, Action.ReadList], Category);
  // can(Action.Read, Product, { available: true });
  // can(Action.Read, Customer, { id: customer.id });
  // can(Action.Update, Customer, { id: customer.id });
  // can<FlatOrder>([Action.Read, Action.ReadList], Order, {
  //   'customer.id': customer.id,
  // });
  // can<FlatOrderItem>(Action.Update, OrderItem, 'status', {
  //   status: { $in: [OrderItemStatus.PENDING, OrderItemStatus.TRANSPORTING] },
  //   'order.customer.id': customer.id,
  // });

  return build({
    detectSubjectType: (item) =>
      item.constructor as ExtractSubjectType<Subjects>,
  });
};
