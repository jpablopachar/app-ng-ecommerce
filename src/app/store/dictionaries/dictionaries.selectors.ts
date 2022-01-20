import {
  createFeatureSelector,
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector
} from '@ngrx/store';
import { Dictionaries, Dictionary } from './dictionaries.models';
import { DictionariesState } from './dictionaries.reducers';

export const getDictionariesState: MemoizedSelector<
  object,
  DictionariesState,
  DefaultProjectorFn<DictionariesState>
> = createFeatureSelector<DictionariesState>('dictionaries');

export const getDictionaries: MemoizedSelector<
  object,
  Dictionaries | null,
  DefaultProjectorFn<Dictionaries | null>
> = createSelector(
  getDictionariesState,
  (state: DictionariesState): Dictionaries | null => state.entities
);

export const getLoading: MemoizedSelector<
  object,
  boolean | null,
  DefaultProjectorFn<boolean | null>
> = createSelector(
  getDictionariesState,
  (state: DictionariesState): boolean | null => state.loading
);

export const getIsReady: MemoizedSelector<
  object,
  boolean | null,
  DefaultProjectorFn<boolean | null>
> = createSelector(
  getDictionariesState,
  (state: DictionariesState): boolean | null => state.entities && !state.loading
);

export const getRoles: MemoizedSelector<
  object,
  Dictionary | undefined,
  DefaultProjectorFn<Dictionary | undefined>
> = createSelector(
  getDictionaries,
  (state: Dictionaries | null): Dictionary | undefined => state?.roles
);

export const getQualifications: MemoizedSelector<
  object,
  Dictionary | undefined,
  DefaultProjectorFn<Dictionary | undefined>
> = createSelector(
  getDictionaries,
  (state: Dictionaries | null): Dictionary | undefined => state?.qualifications
);

export const getSkills: MemoizedSelector<
  object,
  Dictionary | undefined,
  DefaultProjectorFn<Dictionary | undefined>
> = createSelector(
  getDictionaries,
  (state: Dictionaries | null): Dictionary | undefined => state?.skills
);

export const getSpecializations: MemoizedSelector<
  object,
  Dictionary | undefined,
  DefaultProjectorFn<Dictionary | undefined>
> = createSelector(
  getDictionaries,
  (state: Dictionaries | null): Dictionary | undefined => state?.specializations
);
