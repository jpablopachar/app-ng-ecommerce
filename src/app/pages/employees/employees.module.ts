import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserPhotoModule } from '@app/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EmployeeComponent } from './components/employee.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './pages/employees.component';
import { effects, reducers } from './store';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    UserPhotoModule,
    StoreModule.forFeature('employees',reducers ),
    EffectsModule.forFeature(effects),
  ]
})
export class EmployeesModule { }
