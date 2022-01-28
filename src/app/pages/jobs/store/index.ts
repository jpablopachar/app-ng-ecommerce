import {
  ActionReducerMap,
  createFeatureSelector,
  DefaultProjectorFn,
  MemoizedSelector
} from '@ngrx/store';
import { ListEffects } from './list/list.effects';
import * as fromList from './list/list.reducers';

export interface JobsState {
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<JobsState> = {
  list: fromList.reducer,
};

export const effects: any[] = [ListEffects];

export const getJobsState: MemoizedSelector<object, JobsState, DefaultProjectorFn<JobsState>> = createFeatureSelector<JobsState>('jobs');
