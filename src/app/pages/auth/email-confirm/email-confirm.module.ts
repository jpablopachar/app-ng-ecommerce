import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmailConfirmComponent } from './components/email-confirm.component';
import { EmailConfirmRoutingModule } from './email-confirm-routing.module';

@NgModule({
  declarations: [
    EmailConfirmComponent
  ],
  imports: [
    CommonModule,
    EmailConfirmRoutingModule
  ]
})
export class EmailConfirmModule { }
