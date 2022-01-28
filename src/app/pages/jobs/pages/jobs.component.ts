import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { FormComponent } from '../components/form/component/form.component';
import * as fromList from '../store/list';
import { Job } from '../store/list';

@Component({
  selector: 'app-jobs',
  template: `
    <div class="app-page">
      <div class="app-page__header">
        <h1>Jobs</h1>
      </div>
      <div class="app-page__content">
        <app-job
          *ngFor="let job of jobs$ | async"
          [item]="job"
          [isEditable]="isEditable$ | async"
          (edit)="onEdit($event)"
          (delete)="onDelete($event)"
        >
        </app-job>
      </div>
      <div class="app-page__footer" *ngIf="isEditable$ | async">
        <app-button (click)="onAdd()">Add</app-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent implements OnInit {
  public jobs$!: Observable<Job[]>;
  public isEditable$!: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private readonly _store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.jobs$ = this._store.pipe(select(fromList.selectAll)) as Observable<
      Job[]
    >;
    this.isEditable$ = this._store.pipe(
      select(fromUser.getRoleId),
      map((roleId: any) => ['recruiter', 'employee'].includes(roleId))
    );

    this._store.dispatch(new fromList.Read());
  }

  public onAdd(): void {
    this.dialog.open(FormComponent, {
      width: '650px',
      height: '220px',
      data: {},
    });
  }

  public onEdit(value: Job): void {
    this.dialog.open(FormComponent, {
      width: '650px',
      height: '220px',
      data: { value },
    });
  }

  public onDelete(id: string): void {
    this._store.dispatch(new fromList.Delete(id));
  }
}
