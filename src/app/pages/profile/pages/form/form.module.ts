import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule, ButtonModule, CheckboxesModule, DateRangeModule, FilesUploadModule, FormFieldModule, InputModule, RadioModule, SelectModule, SpinnerModule, UserPhotoModule } from '@app/shared';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { ExperienceComponent } from './components/professional/roles/employee/experience/experience.component';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';
import { StepperModule } from './components/stepper/stepper.module';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './pages/form/form.component';
import { MapperService } from './services/mapper/mapper.service';

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
    StepperModule,
    FormFieldModule,
    SelectModule,
    CheckboxesModule,
    RadioModule,
    ButtonModule,
    UserPhotoModule,
    AutocompleteModule,
    FilesUploadModule,
    StepperModule,
    SpinnerModule,
    InputModule,
    DateRangeModule
  ],
  providers: [MapperService]
})
export class FormModule { }
