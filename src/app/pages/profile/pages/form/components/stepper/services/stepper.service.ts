import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';

export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  public steps!: Step[];
  public activeStep!: ActiveStep;
  public next: Subject<boolean>;
  public next$: Observable<boolean>;
  public prev: Subject<void>;
  public prev$: Observable<void>;
  public complete: Subject<boolean>;
  public complete$: Observable<boolean>;
  public cancel: Subject<void>;
  public cancel$: Observable<void>;
  public check: Subject<'next' | 'complete'>;
  public check$: Observable<'next' | 'complete'>;

  constructor() {
    this.next = new Subject<boolean>();
    this.prev = new Subject<void>();
    this.complete = new Subject<boolean>();
    this.cancel = new Subject<void>();
    this.check = new Subject<'next' | 'complete'>();
    this.next$ = this.next
      .asObservable()
      .pipe(filter((isOk: boolean): boolean => isOk));
    this.complete$ = this.complete
      .asObservable()
      .pipe(filter((isOk: boolean): boolean => isOk));
    this.prev$ = this.prev.asObservable();
    this.cancel$ = this.cancel.asObservable();
    this.check$ = this.check.asObservable();
  }

  public init(steps: Step[]): void {
    this.steps = steps;
    this.activeStep = { ...steps[0], index: 0 };
  }

  public onNext(): void {
    const index: number = this.activeStep.index + 1;

    this.activeStep = { ...this.steps[index], index };
  }

  public onPrev(): void {
    const index: number = this.activeStep.index - 1;

    this.activeStep = { ...this.steps[index], index };
  }
}
