import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserPhotoModule } from '@app/shared';
import { EmployeeComponent } from './components/employee/employee.component';
import { RecruiterComponent } from './components/recruiter/recruiter.component';
import { DisplayRoutingModule } from './display-routing.module';
import { DisplayComponent } from './pages/display.component';

@NgModule({
  declarations: [
    DisplayComponent,
    EmployeeComponent,
    RecruiterComponent
  ],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    UserPhotoModule
  ]
})
export class DisplayModule { }
