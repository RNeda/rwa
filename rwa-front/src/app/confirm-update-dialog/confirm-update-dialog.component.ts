import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-update-dialog',
  templateUrl: './confirm-update-dialog.component.html',
  styleUrl: './confirm-update-dialog.component.scss'
})
export class ConfirmUpdateDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmUpdateDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
