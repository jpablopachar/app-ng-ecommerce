import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UnauthGuard } from '@app/guards';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: (): Promise<any> => import('./login/login.module').then(module => module.LoginModule),
    canActivate: [UnauthGuard]
  },
  {
    path: 'registration',
    loadChildren: (): Promise<any> => import('./registration/registration.module').then(module => module.RegistrationModule),
    canActivate: [UnauthGuard]
  },
  {
    path: 'email-confirm',
    loadChildren: (): Promise<any> => import('./email-confirm/email-confirm.module').then(module => module.EmailConfirmModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
