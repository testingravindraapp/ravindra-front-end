import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDialogData } from '../dashboard.component';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: 'dialog.html',
  styleUrls: ['./dialog.css']
})
export class DialogComponent {
  slideConfig = { 'slidesToShow': 1, 'slidesToScroll': 1 };

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
