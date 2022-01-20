import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@app/shared/buttons';
import {
  FormFieldModule,
  InputModule,
  PasswordModule
} from '@app/shared/controls';
import { SpinnerModule } from '@app/shared/indicators';
import { RegistrationComponent } from './pages/registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
    ButtonModule,
    SpinnerModule,
  ],
})
export class RegistrationModule {}
