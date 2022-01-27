import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as fromRoot from '@app/store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromList from '../store/list';
import { User } from '../store/list/list.models';

@Component({
  selector: 'app-employees',
  template: `
    <div class="app-page">
      <div class="app-page__header">
        <h1>Employees</h1>
      </div>
      <div class="app-page__content" *ngIf="employees$ | async as employees">
        <app-employee *ngFor="let employee of employees" [employee]="employee">
        </app-employee>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  public employees$!: Observable<User[]>;

  constructor(private readonly _store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.employees$ = this._store.pipe(select(fromList.getItems)) as Observable<
      User[]
    >;

    this._store.dispatch(new fromList.Read());
  }
}
