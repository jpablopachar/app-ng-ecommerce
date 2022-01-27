import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromRoot from '@app/store';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromUser from '@app/store/user';
import { UserCreateRequest } from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, switchMap, takeUntil, zip } from 'rxjs';
import * as fromForm from '../../../../store/form';
import { PersonalForm } from '../../components/personal/personal.component';
import { ProfessionalForm } from '../../components/professional/professional.component';
import { StepperService } from '../../components/stepper/services';
import { MapperService } from '../../services/mapper/mapper.service';

export interface ProfileForm {
  personal: PersonalForm | any;
  professional: ProfessionalForm | any;
}

@Component({
  selector: 'app-form',
  template: `
    <div class="app-page">
      <div class="app-page__header">
        <h1>{{ title }}</h1>
      </div>
      <div class="app-page__content">
        <app-stepper *ngIf="dictionariesIsReady$ | async">
          <ng-container [ngSwitch]="stepperService?.activeStep?.key">
            <app-personal
              *ngSwitchCase="'personal'"
              [dictionaries]="dictionaries$ | async"
              (changed)="onChangedPersonal($event)"
              [value]="personal$ | async"
            >
            </app-personal>
            <app-professional
              *ngSwitchCase="'professional'"
              [dictionaries]="dictionaries$ | async"
              (changed)="onChangedProfessional($event)"
              [value]="professional$ | async"
            ></app-professional>
          </ng-container>
        </app-stepper>
      </div>
      <app-spinner *ngIf="loading$ | async"></app-spinner>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  public dictionaries$!:
    | Observable<fromDictionaries.Dictionaries>
    | Observable<any>;
  public dictionariesIsReady$!: Observable<boolean>;
  public personal$!: Observable<PersonalForm> | Observable<any>;
  public professional$!: Observable<ProfessionalForm> | Observable<any>;
  public profile$!: Observable<ProfileForm> | Observable<any>;
  public loading$!: Observable<boolean>;

  private _isEditing!: boolean;
  private _destroy: Subject<any>;
  private _user!: fromUser.User;

  constructor(
    public readonly stepperService: StepperService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<fromRoot.State>,
    private readonly _mapperService: MapperService
  ) {
    this._destroy = new Subject<any>();
  }

  public get title(): string {
    return this._isEditing ? 'Update profile' : 'New profile';
  }

  ngOnInit(): void {
    this._user = this._route.snapshot.data['user'];
    this._isEditing = !!this._user;
    this.profile$ = this._store.pipe(
      select(fromForm.getFormState)
    ) as Observable<ProfileForm>;
    this.personal$ = this._store.pipe(
      select(fromForm.getPersonalForm)
    ) as Observable<PersonalForm>;
    this.professional$ = this._store.pipe(
      select(fromForm.getProfessionalForm)
    ) as Observable<ProfessionalForm>;
    this.loading$ = this._store.pipe(
      select(fromUser.getLoading)
    ) as Observable<boolean>;

    if (this._user) {
      const form: ProfileForm = this._mapperService.userToForm(this._user);

      this._store.dispatch(new fromForm.Set(form));
    }

    this.dictionaries$ = this._store.pipe(
      select(fromDictionaries.getDictionaries)
    );
    this.dictionariesIsReady$ = this._store.pipe(
      select(fromDictionaries.getIsReady)
    ) as Observable<boolean>;

    this.stepperService.init([
      { key: 'personal', label: 'Personal' },
      { key: 'professional', label: 'Professional' },
    ]);
    this.stepperService.complete$
      .pipe(
        switchMap(
          (): Observable<[any, any]> => zip(this.profile$, this.dictionaries$)
        ),
        takeUntil(this._destroy)
      )
      .subscribe(([profile, dictionaries]: [any, any]): void => {
        this.onComplete(profile, this._user, dictionaries);
      });
    this.stepperService.cancel$
      .pipe(takeUntil(this._destroy))
      .subscribe((): void => {
        this._router.navigate(['/profile', this._user.uid]);
      });
  }

  public onChangedPersonal(data: PersonalForm): void {
    this._store.dispatch(new fromForm.Update({ personal: data }));
  }

  public onChangedProfessional(data: ProfessionalForm): void {
    this._store.dispatch(new fromForm.Update({ professional: data }));
  }

  private onComplete(
    profile: ProfileForm | any,
    user: fromUser.User,
    dictionaries: fromDictionaries.Dictionaries | any
  ): void {
    if (this._isEditing) {
      const request: fromUser.User = this._mapperService.formToUserUpdate(
        profile,
        user,
        dictionaries
      );

      this._store.dispatch(new fromUser.Update(request));
    } else {
      const request: UserCreateRequest = this._mapperService.formToUserCreate(
        profile,
        dictionaries
      );

      this._store.dispatch(new fromUser.Create(request));
    }
  }

  ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
    this._store.dispatch(new fromForm.Clear());
  }
}
