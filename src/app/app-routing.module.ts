import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileModule } from './pages/profile/profile.module';
import { StaticModule } from './pages/static/static.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'static',
        loadChildren: (): Promise<any> =>
          import('./pages/static/static.module').then(
            (m): typeof StaticModule => m.StaticModule
          ),
      },
      {
        path: 'profile',
        loadChildren: (): Promise<any> =>
          import('./pages/profile/profile.module').then(
            (m): typeof ProfileModule => m.ProfileModule
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'static/wellcome',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'static/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
