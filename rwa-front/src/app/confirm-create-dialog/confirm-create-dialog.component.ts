import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-create-dialog',
  templateUrl: './confirm-create-dialog.component.html',
  styleUrl: './confirm-create-dialog.component.scss'
})
export class ConfirmCreateDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmCreateDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
