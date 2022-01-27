import * as fromActions from './list.actions';
import { User } from './list.models';

export interface ListState {
  items: User[] | null;
  loading: boolean | null;
  error: string | null;
}

export const initialState: ListState = {
  items: null,
  loading: null,
  error: null,
};

export function reducer(
  state: ListState = initialState,
  action: fromActions.All | any
) {
  switch (action.type) {
    case fromActions.Types.READ: {
      return { ...state, loading: true, error: null };
    }

    case fromActions.Types.READ_SUCCESS: {
      return { ...state, loading: false, error: null, items: action.items };
    }

    case fromActions.Types.READ_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    default: {
      return state;
    }
  }
}
