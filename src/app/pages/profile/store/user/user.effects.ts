import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import * as fromActions from './user.actions';
import { User } from './user.models';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _afs: AngularFirestore
  ) {}

  public read: Observable<Action> = createEffect(
    (): Observable<fromActions.ReadSuccess | fromActions.ReadError> =>
      this._actions.pipe(
        ofType(fromActions.Types.READ),
        switchMap(
          (
            action: fromActions.Read
          ): Observable<fromActions.ReadSuccess | fromActions.ReadError> =>
            this._afs
              .doc<User>(`users/${action.id}`)
              .valueChanges()
              .pipe(
                take(1),
                map(
                  (user: any): fromActions.ReadSuccess =>
                    new fromActions.ReadSuccess(user)
                ),
                catchError(
                  (
                    error: HttpErrorResponse
                  ): Observable<fromActions.ReadError> =>
                    of(new fromActions.ReadError(error.message))
                )
              )
        )
      )
  );
}
