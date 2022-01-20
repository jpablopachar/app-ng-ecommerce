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

  constructor(private readonly store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(fromUser.getUser)) as Observable<fromUser.User>;
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized))
    this.store.dispatch(new fromUser.Init());
    this.store.dispatch(new fromDictionaries.Read());
  }

  public onSignOut() : void {
    this.store.dispatch(new fromUser.SignOut());
  }
}
