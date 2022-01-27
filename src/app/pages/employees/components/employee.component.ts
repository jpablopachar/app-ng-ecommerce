import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { User } from '../store/list/list.models';

@Component({
  selector: 'app-employee',
  template: `
    <div class="employee">
      <app-user-photo
        [photoURL]="employee.photoURL ? employee.photoURL : ''"
      ></app-user-photo>
      <div class="employee__info">
        <div class="info">
          <div class="info__header">
            <a class="app-a" [routerLink]="['/profile', employee.uid]">{{
              employee.name
            }}</a>
          </div>
          <p>Salary : {{ employee.role.expectedSalary | currency }}</p>
          <p>
            Specialization :
            {{
              employee.role.specialization
                ? employee.role.specialization.name
                : ''
            }}
          </p>
          <div class="info__skills">
            Skills:
            <span class="skill" *ngFor="let skill of employee.role.skills">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';
      @import 'src/styles/base/mixins';

      .employee {
        @include card;
        margin-bottom: 16px;
        display: flex;

        &__info {
          margin-left: 20px;
        }
      }

      .info {
        &__header {
          font-size: 1.2em;
          margin-bottom: 12px;
        }

        &__skills {
          display: flex;
        }
      }

      .skill {
        display: block;
        background: $secondary;
        color: $on-secondary;
        padding: 2px 10px;
        border-radius: 12px;
        margin-left: 5px;
        font-size: 0.8em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  @Input() employee!: User;

  constructor() {}
}
