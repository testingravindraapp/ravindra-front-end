import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../dashboard.component';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['./dialog.css']
  })
  export class DialogComponent {
  
    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }