import { User } from '@app/models/server';
import {
  createFeatureSelector,
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector
} from '@ngrx/store';
import { UserState } from './user.reducers';

export const getUserState: MemoizedSelector<
  object,
  UserState,
  DefaultProjectorFn<UserState>
> = createFeatureSelector<UserState>('user');

export const getUser: MemoizedSelector<
  object,
  User | null,
  DefaultProjectorFn<User | null>
> = createSelector(
  getUserState,
  (state: UserState): User | null => state.entity
);

export const getLoading: MemoizedSelector<
  object,
  boolean | null,
  DefaultProjectorFn<boolean | null>
> = createSelector(
  getUserState,
  (state: UserState): boolean | null => state.loading
);

export const getIsAuthorized: MemoizedSelector<
  object,
  boolean,
  DefaultProjectorFn<boolean>
> = createSelector(getUserState, (state: UserState): boolean => !!state.uid);

export const getRoleId: MemoizedSelector<
  object,
  string | null | undefined,
  DefaultProjectorFn<string | null | undefined>
> = createSelector(
  getUser,
  (user: User | null): string | null | undefined => user && user.roleId
);
