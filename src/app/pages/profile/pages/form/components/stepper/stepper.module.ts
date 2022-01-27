import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StepperComponent } from './components/stepper.component';
import { StepperService } from './services';

@NgModule({
  declarations: [StepperComponent],
  imports: [CommonModule],
  exports: [StepperComponent],
  providers: [StepperService]
})
export class StepperModule { }
