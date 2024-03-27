import { Component } from '@angular/core';
import { ICircuit } from '../../Models/i-circuit';
import { ApiF1Service } from '../../Services/api-f1.service';

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.component.html',
  styleUrl: './circuits.component.scss'
})
export class CircuitsComponent {

  circuits!: ICircuit[];

  constructor(private apiF1: ApiF1Service) { }

  ngOnInit(): void {
    this.loadCircuits();
  }

  loadCircuits(): void {
    this.apiF1.getAllCircuits().subscribe((res) => {
      this.circuits = res;
      console.log(this.circuits);

    });
  }


}
