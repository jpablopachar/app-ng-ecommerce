import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUser from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public isAuthorized$!: Observable<boolean>;
  public user$!: Observable<fromUser.User>;

  constructor(private readonly _store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.user$ = this._store.pipe(select(fromUser.getUser)) as Observable<fromUser.User>;
    this.isAuthorized$ = this._store.pipe(select(fromUser.getIsAuthorized))
    this._store.dispatch(new fromUser.Init());
    this._store.dispatch(new fromDictionaries.Read());
  }

  public onSignOut() : void {
    this._store.dispatch(new fromUser.SignOut());
  }
}
