import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-over-dialog',
  templateUrl: './game-over-dialog.component.html',
  styleUrl: './game-over-dialog.component.scss'
})
export class GameOverDialogComponent {

  constructor(public dialogRef:MatDialogRef<GameOverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text1:string, text2:string }
  ){}

  closeDialog():void{
    this.dialogRef.close();
  }

}
