import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  DocumentChangeAction,
  DocumentReference
} from '@angular/fire/compat/firestore';
import { extractDocumentChangeActionData } from '@app/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import firebase from 'firebase/compat/app';
import { catchError, from, map, Observable, of, switchMap, take } from 'rxjs';
import * as fromActions from './list.actions';
import { Job, JobCreateRequest } from './list.models';

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
                'jobs',
                (
                  ref: CollectionReference<firebase.firestore.DocumentData>
                ): firebase.firestore.Query<firebase.firestore.DocumentData> =>
                  ref.orderBy('created')
              )
              .snapshotChanges()
              .pipe(
                take(1),
                map((changes: DocumentChangeAction<any>[]): any[] =>
                  changes.map((change: DocumentChangeAction<any>): any =>
                    extractDocumentChangeActionData(change)
                  )
                ),
                map(
                  (items: Job[]): fromActions.ReadSuccess =>
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

  public create: Observable<Action> = createEffect(
    (): Observable<fromActions.CreateSuccess | fromActions.CreateError> =>
      this._actions.pipe(
        ofType(fromActions.Types.CREATE),
        map((action: fromActions.Create) => action.job),
        map((job: JobCreateRequest) => ({
          ...job,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })),
        switchMap(
          (
            request: JobCreateRequest
          ): Observable<fromActions.CreateSuccess | fromActions.CreateError> =>
            from(this._afs.collection('jobs').add(request)).pipe(
              map(
                (res: DocumentReference<any>): Job => ({
                  ...request,
                  id: res.id,
                })
              ),
              map(
                (job: Job): fromActions.CreateSuccess =>
                  new fromActions.CreateSuccess(job)
              ),
              catchError(
                (
                  error: HttpErrorResponse
                ): Observable<fromActions.CreateError> =>
                  of(new fromActions.CreateError(error.message))
              )
            )
        )
      )
  );

  public update: Observable<Action> = createEffect(
    (): Observable<fromActions.UpdateSuccess | fromActions.UpdateError> =>
      this._actions.pipe(
        ofType(fromActions.Types.UPDATE),
        map((action: fromActions.Update): Job => action.job),
        map(
          (job: Job): Job => ({
            ...job,
            updated: firebase.firestore.FieldValue.serverTimestamp(),
          })
        ),
        switchMap(
          (
            job: Job
          ): Observable<fromActions.UpdateSuccess | fromActions.UpdateError> =>
            from(this._afs.collection('jobs').doc(job.id).set(job)).pipe(
              map(
                (): fromActions.UpdateSuccess =>
                  new fromActions.UpdateSuccess(job.id, job)
              ),
              catchError(
                (
                  error: HttpErrorResponse
                ): Observable<fromActions.UpdateError> =>
                  of(new fromActions.UpdateError(error.message))
              )
            )
        )
      )
  );

  public delete: Observable<Action> = createEffect(
    (): Observable<fromActions.DeleteSuccess | fromActions.DeleteError> =>
      this._actions.pipe(
        ofType(fromActions.Types.DELETE),
        map((action: fromActions.Delete): string => action.id),
        switchMap(
          (
            id: string
          ): Observable<fromActions.DeleteSuccess | fromActions.DeleteError> =>
            from(this._afs.collection('jobs').doc(id).delete()).pipe(
              map(
                (): fromActions.DeleteSuccess =>
                  new fromActions.DeleteSuccess(id)
              ),
              catchError(
                (
                  error: HttpErrorResponse
                ): Observable<fromActions.DeleteError> =>
                  of(new fromActions.DeleteError(error.message))
              )
            )
        )
      )
  );
}
