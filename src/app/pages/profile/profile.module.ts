import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { FormModule } from './pages/form/form.module';
import { DisplayModule } from './pages/display/display.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormModule,
    DisplayModule
  ]
})
export class ProfileModule { }
