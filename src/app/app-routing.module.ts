import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', loadChildren: './auth/sign-in/sign-in.module#SignInPageModule' },
  { path: 'sign-up', loadChildren: './auth/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'forgot-password', loadChildren: './auth/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'verify-email', loadChildren: './auth/verify-email/verify-email.module#VerifyEmailPageModule' },
  { path: 'home', loadChildren: './dashboard/home/home.module#HomePageModule', canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
