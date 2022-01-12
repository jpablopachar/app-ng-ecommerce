import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordComponent } from './components/password.component';

@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PasswordComponent
  ]
})
export class PasswordModule { }
