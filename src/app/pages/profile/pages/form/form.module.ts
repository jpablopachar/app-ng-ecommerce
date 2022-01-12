import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalComponent } from './components/personal/personal.component';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './pages/form/form.component';
import { MapperService } from './services/mapper/mapper.service';
import { ProfessionalComponent } from './components/professional/professional.component';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { ExperienceComponent } from './components/professional/roles/employee/experience/experience.component';
import { StepperModule } from './components/stepper/stepper.module';

@NgModule({
  declarations: [
    PersonalComponent,
    FormComponent,
    ProfessionalComponent,
    RecruiterComponent,
    EmployeeComponent,
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    StepperModule
  ],
  providers: [MapperService]
})
export class FormModule { }
