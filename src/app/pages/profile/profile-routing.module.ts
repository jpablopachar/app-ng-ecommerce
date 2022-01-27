import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayModule } from './pages/display/display.module';
import { FormModule } from './pages/form/form.module';
import { UserResolver } from './resolvers';

const routes: Routes = [
  {
    path: 'new',
    loadChildren: (): Promise<any> =>
      import('./pages/form/form.module').then((module): typeof FormModule => module.FormModule),
  },
  {
    path: 'edit',
    loadChildren: (): Promise<any> =>
      import('./pages/form/form.module').then((module): typeof FormModule => module.FormModule),
    resolve: { user: UserResolver },
  },
  {
    path: ':id',
    loadChildren: (): Promise<any> =>
      import('./pages/display/display.module').then((module): typeof DisplayModule => module.DisplayModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
