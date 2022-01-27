import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActiveStep, Step, StepperService } from '../services';

@Component({
  selector: 'app-stepper',
  template: `
    <div class="stepper">
      <div class="stepper__header">
        <ng-container
          *ngFor="let step of steps; let index = index; let last = last"
        >
          <div class="step" [class.step__active]="isActive(index)">
            <div class="step__icon">
              <span>{{ isCompleted(index) ? '&#10003;' : index + 1 }}</span>
            </div>
            <div class="step__label">
              {{ step.label }}
            </div>
          </div>
          <div class="gap" *ngIf="!last"></div>
        </ng-container>
      </div>
      <div class="stepper__content">
        <ng-content></ng-content>
      </div>
      <div class="stepper__footer">
        <button class="app-button" *ngIf="isFirst()" (click)="onCancel()">
          Cancel
        </button>
        <button class="app-button" *ngIf="!isFirst()" (click)="onPrev()">
          Prev
        </button>
        <button class="app-button" *ngIf="!isLast()" (click)="onNext()">
          Next
        </button>
        <button class="app-button" *ngIf="isLast()" (click)="onComplete()">
          Completed
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';
      @import 'src/styles/base/mixins';

      .stepper {
        position: relative;

        &__header {
          @include shadow;
          background: $base;
          height: 40px;
          border-radius: 25px;
          padding: 0 15px 0 5px;
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
        }

        &__content {
          margin-bottom: 16px;
        }

        &__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .step {
        display: flex;
        align-items: center;
        justify-content: center;

        &__icon {
          width: 28px;
          min-width: 28px;
          height: 28px;
          border-radius: 14px;
          line-height: 28px;
          text-align: center;
          font-size: 0.8em;
          margin-right: 12px;
          border: solid 1px $base-dark;
        }

        &__label {
          text-transform: uppercase;
        }

        &__active {
          color: $secondary-dark;

          .step__icon {
            background-color: $secondary;
            border-color: $secondary;
            color: $on-secondary;
          }
        }
      }

      .gap {
        margin: 0 12px;
        height: 20px;
        border-bottom: 1px solid $base-dark;
        flex-grow: 1;
      }
    `,
  ],
})
export class StepperComponent implements OnInit, OnDestroy {
  private destroy: Subject<any>;

  constructor(private readonly _stepperService: StepperService) {
    this.destroy = new Subject<any>();
  }

  ngOnInit(): void {
    this._stepperService.next$
      .pipe(takeUntil(this.destroy))
      .subscribe((): void => this._stepperService.onNext());
  }

  public get steps(): Step[] {
    return this._stepperService.steps;
  }

  public get activeStep(): ActiveStep {
    return this._stepperService.activeStep;
  }

  public isActive(index: number): boolean {
    return index === this.activeStep.index;
  }

  public isCompleted(index: number): boolean {
    return index < this.activeStep.index;
  }

  public isFirst(): boolean {
    return this.activeStep.index === 0;
  }

  public isLast(): boolean {
    return this.activeStep.index === this.steps.length - 1;
  }

  public onNext(): void {
    this._stepperService.check.next('next');
  }

  public onComplete(): void {
    this._stepperService.check.next('complete');
  }

  public onPrev(): void {
    this._stepperService.onPrev();
  }

  public onCancel(): void {
    this._stepperService.cancel.next();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
