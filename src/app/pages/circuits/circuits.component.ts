import { Component, OnInit } from '@angular/core';
import { ICircuit } from '../../Models/i-circuit';
import { ApiF1Service } from '../../Services/api-f1.service';

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.component.html',
  styleUrls: ['./circuits.component.scss']
})
export class CircuitsComponent implements OnInit {
  circuits: ICircuit[] = [];
  currentPage = 1;
  itemsPerPage = 12;

  constructor(private apiF1: ApiF1Service) { }

  ngOnInit(): void {
    this.loadCircuits();
  }

  loadCircuits(): void {
    this.apiF1.getAllCircuits().subscribe((res) => {
      this.circuits = res;
    });
  }

  paginate(circuits: ICircuit[], page: number, itemsPerPage: number): ICircuit[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return circuits.slice(startIndex, endIndex);
  }

  maxPages(circuits: ICircuit[], itemsPerPage: number): number {
    return Math.ceil(circuits.length / itemsPerPage);
  }

  pagesArray(pages: number): number[] {
    return new Array(pages).fill(0).map((_, index) => index + 1);
  }
}
