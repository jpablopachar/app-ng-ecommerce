import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WellcomeComponent } from './pages/wellcome.component';
import { WellcomeRoutingModule } from './wellcome-routing.module';

@NgModule({
  declarations: [
    WellcomeComponent
  ],
  imports: [
    CommonModule,
    WellcomeRoutingModule
  ]
})
export class WellcomeModule { }
