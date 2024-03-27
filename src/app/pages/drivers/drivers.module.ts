import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriversRoutingModule } from './drivers-routing.module';
import { DriversComponent } from './drivers.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';


@NgModule({
  declarations: [
    DriversComponent,
    DriverDetailComponent
  ],
  imports: [
    CommonModule,
    DriversRoutingModule
  ]
})
export class DriversModule { }
