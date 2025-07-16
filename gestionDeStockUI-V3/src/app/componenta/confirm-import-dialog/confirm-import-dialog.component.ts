import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-import-dialog',
  templateUrl: './confirm-import-dialog.component.html',
  styleUrl: './confirm-import-dialog.component.css'
})
export class ConfirmImportDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
