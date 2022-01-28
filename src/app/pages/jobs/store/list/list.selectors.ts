import {
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector
} from '@ngrx/store';
import { getJobsState, JobsState } from '../index';
import { listAdapter } from './list.reducers';

export const getListState = createSelector(
  getJobsState,
  (state: JobsState) => state.list
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  listAdapter.getSelectors(getListState);

export const selectEntityById = (props: {
  id: string;
}): MemoizedSelector<object, any, DefaultProjectorFn<any>> =>
  createSelector(selectEntities, (entities: any) => entities[props.id]);
