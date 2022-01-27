import { createSelector } from '@ngrx/store';
import { getProfileState, ProfileState } from '../index';
import { Employee, Recruiter, User } from './user.models';
import { UserState } from './user.reducers';

export const getUserState = createSelector(
  getProfileState,
  (state: ProfileState): UserState => state.user
);

export const getUser = createSelector(
  getUserState,
  (state: UserState): User | null => state.entity
);

export const getLoading = createSelector(
  getUserState,
  (state: UserState): boolean | null => state.loading
);

export const getRole = createSelector(
  getUserState,
  (state: UserState): Employee | Recruiter | null | undefined =>
    state.entity?.role
);
