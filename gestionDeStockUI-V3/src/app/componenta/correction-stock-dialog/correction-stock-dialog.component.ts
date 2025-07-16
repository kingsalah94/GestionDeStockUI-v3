import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-correction-stock-dialog',
  templateUrl: './correction-stock-dialog.component.html',
  styleUrl: './correction-stock-dialog.component.css'
})
export class CorrectionStockDialog{
  quantity: number = 0;
  operation: 'positive' | 'negative' = 'positive';

  constructor(
    private dialogRef: MatDialogRef<CorrectionStockDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { currentStock: number }
  ) {}

  submit(): void {
    let updatedStock = this.data.currentStock;
    if (this.operation === 'positive') {
      updatedStock += this.quantity;
    } else {
      updatedStock -= this.quantity;
    }

    this.dialogRef.close(updatedStock);
  }
}
