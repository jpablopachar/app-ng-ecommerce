import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundModule } from './not-found/not-found.module';
import { WellcomeModule } from './wellcome/wellcome.module';

const routes: Routes = [
  {
    path: 'wellcome',
    loadChildren: (): Promise<any> =>
      import('./wellcome/wellcome.module').then(
        (m): typeof WellcomeModule => m.WellcomeModule
      ),
  },
  {
    path: '',
    loadChildren: (): Promise<any> =>
      import('./not-found/not-found.module').then(
        (m): typeof NotFoundModule => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticRoutingModule {}
