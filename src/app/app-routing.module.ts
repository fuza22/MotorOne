import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './Pages/homepage/welcome/welcome.component';

const routes: Routes = [
{ path: '', component: WelcomeComponent},
{ path: 'homepage', loadChildren: () => import('./Pages/homepage/homepage.module').then(m => m.HomepageModule) },
{ path: 'auth', loadChildren: () => import('./Pages/auth/auth.module').then(m => m.AuthModule) },
{ path: 'profile/:id', loadChildren: () => import('./Pages/profile/profile.module').then(m => m.ProfileModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
