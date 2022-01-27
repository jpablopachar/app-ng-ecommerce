import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recruiter } from '../../../../../../store/user';

@Component({
  selector: 'app-recruiter',
  template: `
    <p><b>Company:</b>{{ role.companyName }}</p>
    <p><b>Employees cant:</b>{{ role.employeesCount }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruiterComponent {
  @Input() role!: Recruiter | any;
}
