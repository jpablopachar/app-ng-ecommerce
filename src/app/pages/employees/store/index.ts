import {
  ActionReducerMap,
  createFeatureSelector,
  DefaultProjectorFn,
  MemoizedSelector
} from '@ngrx/store';
import { ListEffects } from './list/list.effects';
import * as fromList from './list/list.reducers';

export interface EmployeesState {
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<EmployeesState> = {
  list: fromList.reducer,
};

export const effects: any[] = [ListEffects];

export const getEmployeesState: MemoizedSelector<
  object,
  EmployeesState,
  DefaultProjectorFn<EmployeesState>
> = createFeatureSelector<EmployeesState>('employees');
