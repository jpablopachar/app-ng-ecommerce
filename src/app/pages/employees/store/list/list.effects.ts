import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  DocumentChangeAction
} from '@angular/fire/compat/firestore';
import { extractDocumentChangeActionData } from '@app/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import firebase from 'firebase/compat/app';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import * as fromActions from './list.actions';
import { User } from './list.models';

type Action = fromActions.All;

@Injectable()
export class ListEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _afs: AngularFirestore
  ) {}

  public read: Observable<Action> = createEffect(
    (): Observable<fromActions.ReadSuccess | fromActions.ReadError> =>
      this._actions.pipe(
        ofType(fromActions.Types.READ),
        switchMap(
          (): Observable<fromActions.ReadSuccess | fromActions.ReadError> =>
            this._afs
              .collection(
                'users',
                (
                  ref: CollectionReference<firebase.firestore.DocumentData>
                ): firebase.firestore.Query<firebase.firestore.DocumentData> =>
                  ref.where('roleId', '==', 'employee')
              )
              .snapshotChanges()
              .pipe(
                take(1),
                map((changes: DocumentChangeAction<any>[]): any[] =>
                  changes.map((change: DocumentChangeAction<any>): any =>
                    extractDocumentChangeActionData(change, false)
                  )
                ),
                map(
                  (items: User[]): fromActions.ReadSuccess =>
                    new fromActions.ReadSuccess(items)
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
