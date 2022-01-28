import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '@app/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormModule } from './components/form/form.module';
import { JobComponent } from './components/job/job.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './pages/jobs.component';
import { effects, reducers } from './store';

@NgModule({
  declarations: [
    JobsComponent,
    JobComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    StoreModule.forFeature('jobs', reducers),
    EffectsModule.forFeature(effects),
    MatDialogModule,
    ButtonModule,
    FormModule
  ]
})
export class JobsModule { }
