import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { SelectComponent } from './components/select.component';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, MatSelectModule],
  exports: [SelectComponent],
})
export class SelectModule {}
