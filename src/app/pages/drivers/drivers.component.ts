import { ApiF1Service } from './../../Services/api-f1.service';
import { IDriver } from './../../Models/i-driver';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent{
  drivers!: IDriver[];

  constructor(private apiF1: ApiF1Service) { }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.apiF1.getAllDrivers().subscribe((res) => {
      this.drivers = res;
    });
  }


}
