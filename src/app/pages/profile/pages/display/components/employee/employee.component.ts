import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Employee } from '../../../../../../store/user';

@Component({
  selector: 'app-employee',
  template: `
    <div class="employee">
      <p><b>Salary:</b> {{ role.expectedSalary | currency }}</p>
      <p>
        <b>Specialization:</b>
        {{ role.specialization ? role.specialization.name : '' }}
      </p>
      <p>
        <b>Qualification:</b>
        {{ role.qualification ? role.qualification.name : '' }}
      </p>
      <p class="employee__skills">
        <b>Skills:</b>
        <span class="skill" *ngFor="let skill of role.skills">
          {{ skill.name }}
        </span>
      </p>
      <p>
        <b>Experience</b>
      </p>
      <p *ngFor="let experience of role.experiences">
        {{ experience.companyName }} <br />
        {{ experience.period ? (experience.period.from | date) : '' }} &mdash;
        {{ experience.period ? (experience.period.to | date) : '' }}
      </p>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

      .employee {
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
        font-weight: 500;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  @Input() role!: Employee | any;
}
