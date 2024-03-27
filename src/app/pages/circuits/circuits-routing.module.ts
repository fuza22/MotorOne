import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitsComponent } from './circuits.component';
import { CircuitsDetailsComponent } from './circuits-details/circuits-details.component';

const routes: Routes = [{ path: '', component: CircuitsComponent },
{ path: 'search', component: CircuitsComponent },
{ path: 'details/:circuit_key', component: CircuitsDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircuitsRoutingModule { }
