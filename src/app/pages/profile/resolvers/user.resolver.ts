import { Injectable } from '@angular/core';
import {
  Resolve
} from '@angular/router';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<fromUser.User | null> {
  constructor(private _store: Store<fromRoot.State>) {}

  resolve(): Observable<fromUser.User | null> {
    return this._store.pipe(
      select(fromUser.getUser),
      filter((user: fromUser.User | null): boolean => !!user),
      take(1)
    );
  }
}
