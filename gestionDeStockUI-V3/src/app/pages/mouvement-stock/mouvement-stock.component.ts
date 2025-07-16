import {Component, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-mouvement-stock',
  templateUrl: './mouvement-stock.component.html',
  styleUrl: './mouvement-stock.component.css'
})
export class MouvementStockComponent {

  @ViewChild(MatExpansionPanel) panel!: MatExpansionPanel;

  filterdata($event: Event) {

  }
}
