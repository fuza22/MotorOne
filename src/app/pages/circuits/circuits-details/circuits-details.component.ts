import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiF1Service } from '../../../Services/api-f1.service';
import { ICircuit } from '../../../Models/i-circuit';

@Component({
  selector: 'app-circuits-details',
  templateUrl: './circuits-details.component.html',
  styleUrl: './circuits-details.component.scss'
})
export class CircuitsDetailsComponent {

  constructor(private route: ActivatedRoute, private f1Svc: ApiF1Service){}

  circuit!: ICircuit[];
  circuitKey!: string | null;

  ngOnInit(){

    this.route.paramMap.subscribe(res => {

      this.circuitKey = res.get('circuit_key');
      this.f1Svc.getCircuitById(Number (this.circuitKey)).subscribe(res => {

        this.circuit = res;
        console.log(this.circuit);


      });

    })

  }

}
