import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards';
import { EmployeesModule } from './pages/employees/employees.module';
import { ProfileModule } from './pages/profile/profile.module';
import { StaticModule } from './pages/static/static.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: (): Promise<any> => import('./pages/auth/auth.module').then(module => module.AuthModule)
      },
      {
        path: 'static',
        loadChildren: (): Promise<any> =>
          import('./pages/static/static.module').then(
            (module): typeof StaticModule => module.StaticModule
          ),
      },
      {
        path: 'profile',
        loadChildren: (): Promise<any> =>
          import('./pages/profile/profile.module').then(
            (module): typeof ProfileModule => module.ProfileModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'employees',
        loadChildren: (): Promise<any> =>
          import('./pages/employees/employees.module').then(
            (module): typeof EmployeesModule => module.EmployeesModule
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
