import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../store/list';

@Component({
  selector: 'app-job',
  template: `
    <div class="job">
      <div class="job__content">
        {{ item.title }} <br />
        {{ item.salary | currency }}
      </div>
      <div class="job__actions" *ngIf="isEditable">
        <app-button (click)="onEdit(item)">Edit</app-button>
        <app-button (click)="onDelete(item.id)">Delete</app-button>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/mixins';

      .job {
        @include card;
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobComponent {
  @Input() item!: Job;
  @Input() isEditable!: boolean | any;

  @Output() edit: EventEmitter<Job>;
  @Output() delete: EventEmitter<string>;

  constructor() {
    this.edit = new EventEmitter<Job>();
    this.delete = new EventEmitter<string>();
  }

  public onEdit(job: Job): void {
    this.edit.emit(job);
  }

  public onDelete(id: string): void {
    this.delete.emit(id);
  }
}
