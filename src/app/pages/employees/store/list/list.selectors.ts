import { createSelector } from '@ngrx/store';
import { EmployeesState, getEmployeesState } from '../index';
import { User } from './list.models';
import { ListState } from './list.reducers';

export const getListState = createSelector(
  getEmployeesState,
  (state: EmployeesState): any => state.list
);

export const getItems = createSelector(
  getListState,
  (state: ListState): User[] | null => state.items
);

export const getLoading = createSelector(
  getListState,
  (state: ListState): boolean | null => state.loading
);
