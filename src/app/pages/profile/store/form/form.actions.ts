import { Action } from '@ngrx/store';
import { ProfileForm } from '../form/form.models';

export enum Types {
  SET = '[Profile] [Form] Set',
  UPDATE = '[Profile] [Form] Update',
  CLEAR = '[Profile] [Form] Clear',
}

export class Set implements Action {
  readonly type: Types.SET = Types.SET;

  constructor(public readonly form: ProfileForm) {}
}

export class Update implements Action {
  readonly type: Types.UPDATE = Types.UPDATE;

  constructor(public readonly changes: Partial<ProfileForm>) {}
}

export class Clear implements Action {
  readonly type: Types.CLEAR = Types.CLEAR;

  constructor() {}
}

export type All = Set | Update | Clear;
