import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as fromProfileUser from '../../../store/user';

@Component({
  selector: 'app-display',
  template: `
    <div class="app-page" *ngIf="user$ | async as user">
      <div class="app-page__header">
        <h1>{{ user.name }}</h1>
      </div>
      <div class="app-page__content">
        <div class="photo">
          <app-user-photo
            [photoURL]="user.photoURL ? user.photoURL : ''"
          ></app-user-photo>
        </div>
        <p><b>User information</b> {{ user.about }}</p>
        <ng-container [ngSwitch]="user.roleId">
          <app-employee
            *ngSwitchCase="'employee'"
            [role]="user.role || null"
          ></app-employee>
          <app-recruiter
            *ngSwitchCase="'recruiter'"
            [role]="user.role || null"
          ></app-recruiter>
        </ng-container>
      </div>
      <div class="app-page__footer">
        <a class="app-button" routerLink="/profile/edit">Edit</a>
      </div>
    </div>
  `,
  styles: [
    `
      .photo {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent implements OnInit, OnDestroy {
  public user$!: Observable<fromProfileUser.User>;
  public isOwnProfile$!: Observable<boolean>;

  constructor(
    private readonly _router: ActivatedRoute,
    private readonly _store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.user$ = this._store.pipe(
      select(fromProfileUser.getUser)
    ) as Observable<fromProfileUser.User>;

    this._router.params.subscribe((param: Params): void => {
      const id: any = param['id'];

      this._store.dispatch(new fromProfileUser.Read(id));

      this.isOwnProfile$ = this._store.pipe(
        select(fromUser.getUser),
        map(
          (user: fromUser.User | null): boolean | null =>
            user && user.uid === id
        )
      ) as Observable<boolean>;
    });
  }

  ngOnDestroy(): void {
    this._store.dispatch(new fromProfileUser.Clear());
  }
}
