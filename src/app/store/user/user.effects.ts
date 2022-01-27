import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '@app/models/server';
import { NotificationService } from '@app/services';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType
} from '@ngrx/effects';
import { environment } from '@src/environments/environment';
import firebase from 'firebase/compat/app';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs';
import * as fromActions from './user.actions';
import { EmailPasswordCredentials, UserCreateRequest } from './user.models';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private readonly _router: Router,
    private readonly _afAuth: AngularFireAuth,
    private readonly _afs: AngularFirestore,
    private readonly _actions: Actions,
    private readonly _notification: NotificationService
  ) {}

  public signUpEmail: Observable<Action> = createEffect(
    (): Observable<
      fromActions.SignUpEmailError | fromActions.SignUpEmailSuccess
    > =>
      this._actions.pipe(
        ofType(fromActions.Types.SIGN_UP_EMAIL),
        map(
          (action: fromActions.SignUpEmail): EmailPasswordCredentials =>
            action.credentials
        ),
        switchMap(
          (
            credentials: EmailPasswordCredentials
          ): Observable<
            fromActions.SignUpEmailError | fromActions.SignUpEmailSuccess
          > =>
            from(
              this._afAuth.createUserWithEmailAndPassword(
                credentials.email,
                credentials.password
              )
            ).pipe(
              tap((): Promise<void> | undefined =>
                firebase
                  .auth()
                  .currentUser?.sendEmailVerification(
                    environment.actionCodeSettings
                  )
              ),
              map(
                (
                  signUpState: firebase.auth.UserCredential
                ): fromActions.SignUpEmailSuccess =>
                  new fromActions.SignUpEmailSuccess(
                    signUpState.user ? signUpState.user.uid : ''
                  )
              ),
              catchError(
                (
                  error: HttpErrorResponse
                ): Observable<fromActions.SignUpEmailError> => {
                  this._notification.error(error.message);

                  return of(new fromActions.SignUpEmailError(error.message));
                }
              )
            )
        )
      )
  );

  public signInEmail: Observable<
    fromActions.SignInEmailSuccess | fromActions.SignUpEmailError
  > &
    CreateEffectMetadata = createEffect(
    (): Observable<
      fromActions.SignInEmailSuccess | fromActions.SignUpEmailError
    > =>
      this._actions.pipe(
        ofType(fromActions.Types.SIGN_IN_EMAIL),
        map(
          (action: fromActions.SignInEmail): EmailPasswordCredentials =>
            action.credentials
        ),
        switchMap(
          (
            credentials: EmailPasswordCredentials
          ): Observable<
            fromActions.SignInEmailSuccess | fromActions.SignUpEmailError
          > =>
            from(
              this._afAuth.signInWithEmailAndPassword(
                credentials.email,
                credentials.password
              )
            ).pipe(
              switchMap(
                (
                  signInState: firebase.auth.UserCredential
                ): Observable<fromActions.SignInEmailSuccess> =>
                  this._afs
                    .doc(
                      `users/${signInState.user ? signInState.user?.uid : ''}`
                    )
                    .valueChanges()
                    .pipe(
                      take(1),
                      tap(
                        (): Promise<boolean> => this._router.navigateByUrl('')
                      ),
                      map(
                        (user: any): fromActions.SignInEmailSuccess =>
                          new fromActions.SignInEmailSuccess(
                            signInState.user ? signInState.user.uid : '',
                            user || null
                          )
                      )
                    )
              ),
              catchError(
                (
                  error: HttpErrorResponse
                ): Observable<fromActions.SignUpEmailError> => {
                  this._notification.error(error.message);

                  return of(new fromActions.SignUpEmailError(error.message));
                }
              )
            )
        )
      )
  );

  public signOut: Observable<
    fromActions.SignOutSuccess | fromActions.SignOutError
  > &
    CreateEffectMetadata = createEffect(
    (): Observable<fromActions.SignOutSuccess | fromActions.SignOutError> =>
      this._actions.pipe(
        ofType(fromActions.Types.SIGN_OUT_EMAIL),
        switchMap(
          (): Observable<
            fromActions.SignOutSuccess | fromActions.SignOutError
          > =>
            from(this._afAuth.signOut()).pipe(
              map(
                (): fromActions.SignOutSuccess =>
                  new fromActions.SignOutSuccess()
              ),
              catchError(
                (
                  error: HttpErrorResponse
                ): Observable<fromActions.SignOutError> => {
                  this._notification.error(error.message);

                  return of(new fromActions.SignOutError(error.message));
                }
              )
            )
        )
      )
  );

  public init: Observable<
    | fromActions.InitAuthorized
    | fromActions.InitError
    | fromActions.InitUnAuthorized
  > &
    CreateEffectMetadata = createEffect(
    (): Observable<
      | fromActions.InitAuthorized
      | fromActions.InitError
      | fromActions.InitUnAuthorized
    > =>
      this._actions.pipe(
        ofType(fromActions.Types.INIT),
        switchMap(
          (): Observable<firebase.User | null> =>
            this._afAuth.authState.pipe(take(1))
        ),
        switchMap(
          (
            authState: firebase.User | null
          ):
            | Observable<fromActions.InitAuthorized | fromActions.InitError>
            | Observable<fromActions.InitUnAuthorized> => {
            if (authState) {
              return this._afs
                .doc<User>(`users/${authState.uid}`)
                .valueChanges()
                .pipe(
                  take(1),
                  map(
                    (user: any): fromActions.InitAuthorized =>
                      new fromActions.InitAuthorized(
                        authState.uid,
                        user || null
                      )
                  ),
                  catchError(
                    (
                      error: HttpErrorResponse
                    ): Observable<fromActions.InitError> =>
                      of(new fromActions.InitError(error.message))
                  )
                );
            } else {
              return of(new fromActions.InitUnAuthorized());
            }
          }
        )
      )
  );

  public create: Observable<
    fromActions.CreateSuccess | fromActions.CreateError
  > &
    CreateEffectMetadata = createEffect(
    (): Observable<fromActions.CreateSuccess | fromActions.CreateError> =>
      this._actions.pipe(
        ofType(fromActions.Types.CREATE),
        map((action: fromActions.Create): UserCreateRequest => action.user),
        withLatestFrom(this._afAuth.authState.pipe(take(1))),
        map(([user, state]) => ({
          ...user,
          uid: state?.uid || '',
          email: state?.email || '',
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })),
        switchMap(
          (
            user: User
          ): Observable<fromActions.CreateSuccess | fromActions.CreateError> =>
            from(this._afs.collection('users').doc(user.uid).set(user)).pipe(
              tap(
                (): Promise<boolean> =>
                  this._router.navigate(['/profile', user.uid])
              ),
              map(
                (): fromActions.CreateSuccess =>
                  new fromActions.CreateSuccess(user)
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

  public update: Observable<
    fromActions.UpdateSuccess | fromActions.UpdateError
  > &
    CreateEffectMetadata = createEffect(
    (): Observable<fromActions.UpdateSuccess | fromActions.UpdateError> =>
      this._actions.pipe(
        ofType(fromActions.Types.UPDATE),
        map((action: fromActions.Update): User => action.user),
        switchMap(
          (
            user: User
          ): Observable<fromActions.UpdateSuccess | fromActions.UpdateError> =>
            from(this._afs.collection('users').doc(user.uid).set(user)).pipe(
              tap(
                (): Promise<boolean> =>
                  this._router.navigate(['/profile', user.uid])
              ),
              map(
                (): fromActions.UpdateSuccess =>
                  new fromActions.UpdateSuccess(user)
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
}
