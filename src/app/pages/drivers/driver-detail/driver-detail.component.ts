import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiF1Service } from '../../../Services/api-f1.service';
import { IDriver } from '../../../Models/i-driver';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.scss'
})
export class DriverDetailComponent {

  constructor(private route: ActivatedRoute, private f1Svc: ApiF1Service){}

  driver!: IDriver[];
  driverNumber!: string | null;

  ngOnInit(){

    this.route.paramMap.subscribe(res => {

      this.driverNumber = res.get('driver_number');
      this.f1Svc.getById(Number (this.driverNumber)).subscribe(res => {

        this.driver = res;
        console.log(this.driver);


      });

    })

  }


}
