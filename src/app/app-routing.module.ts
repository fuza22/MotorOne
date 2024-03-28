import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { WelcomeComponent } from './Pages/homepage/welcome/welcome.component';
import { NoauthGuard } from './Pages/auth/noauth.guard';
import { AuthGuard } from './Pages/auth/auth.guard';
import { NotFoundComponent } from './Components/not-found/not-found.component';

const routes: Routes = [
{ path: '', pathMatch: "full", redirectTo: "/welcome"},
{ path: 'welcome', component: WelcomeComponent},
{ path: 'homepage', loadChildren: () => import('./Pages/homepage/homepage.module').then(m => m.HomepageModule) },
{ path: 'auth', loadChildren: () => import('./Pages/auth/auth.module').then(m => m.AuthModule), canActivate: [NoauthGuard], canActivateChild: [NoauthGuard] },
{ path: 'profile/:id', loadChildren: () => import('./Pages/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
{ path: 'drivers', loadChildren: () => import('./Pages/drivers/drivers.module').then(m => m.DriversModule) },
{ path: 'circuits', loadChildren: () => import('./Pages/circuits/circuits.module').then(m => m.CircuitsModule) },
{ path: '404', component: NotFoundComponent },
{ path: '**', redirectTo: '/404' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
