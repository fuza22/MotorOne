import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversComponent } from './drivers.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';

const routes: Routes = [{ path: '', component: DriversComponent },
{ path: 'search', component: DriversComponent },
{ path: 'details/:driver_number', component: DriverDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule { }
