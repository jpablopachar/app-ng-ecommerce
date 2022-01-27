import {
  createSelector
} from '@ngrx/store';
import { getProfileState, ProfileState } from '../index';
import { FormState } from './form.reducers';

export const getFormState = createSelector(getProfileState, (state: ProfileState): any => state.form);

export const getPersonalForm= createSelector(
  getFormState,
  (state: FormState): any => !!state.personal && state.personal
);

export const getProfessionalForm= createSelector(
  getFormState,
  (state: FormState): any => !!state.professional && state.professional
);
