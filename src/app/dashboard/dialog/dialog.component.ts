import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../dashboard.component';

@Component({
    selector: 'dialog-modal',
    templateUrl: 'dialog.html',
    styleUrls: ['./dialog.css']
  })
  export class DialogComponent {
    slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }