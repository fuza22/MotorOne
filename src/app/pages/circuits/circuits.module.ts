import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircuitsRoutingModule } from './circuits-routing.module';
import { CircuitsComponent } from './circuits.component';
import { CircuitsDetailsComponent } from './circuits-details/circuits-details.component';


@NgModule({
  declarations: [
    CircuitsComponent,
    CircuitsDetailsComponent
  ],
  imports: [
    CommonModule,
    CircuitsRoutingModule
  ]
})
export class CircuitsModule { }
