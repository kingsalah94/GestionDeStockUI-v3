import {Component, signal} from '@angular/core';
import {CorrectionStockDialog} from '../correction-stock-dialog/correction-stock-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-details-mouvement-stock-articles',
  templateUrl: './details-mouvement-stock-articles.component.html',
  styleUrl: './details-mouvement-stock-articles.component.css'
})
export class DetailsMouvementStockArticlesComponent {

  stock = signal(134);

  constructor(private dialog: MatDialog) {}

  openCorrectionDialog(): void {
    const dialogRef = this.dialog.open(CorrectionStockDialog, {
      width: '700px',
      data: { currentStock: this.stock() }
    });

    dialogRef.afterClosed().subscribe((newStock: number | null) => {
      if (newStock !== null) {
        this.stock.set(newStock);
      }
    });
  }
}
