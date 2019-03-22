import { Component, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDialogData } from '../../interfaces/site';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: 'dialog.html',
  styleUrls: ['./dialog.css']
})
export class DialogComponent implements AfterViewInit {
  slideConfig = { 'slidesToShow': 1, 'slidesToScroll': 1 };
  @ViewChild('slickModal') slickModal: any;
  active: number;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngAfterViewInit() {
    this.slickModal.slickGoTo(this.data.index);
  }
  goLeft() {
    if (this.data.index >= 0) {
      this.slickModal.slickGoTo(--this.data.index);
    } else {
      this.data.index = this.data.name.length - 1;
      this.slickModal.slickGoTo(this.data.index);
    }
  }
  goRight() {
    if (this.data.name.length - 1 > this.data.index) {
      this.slickModal.slickGoTo(++this.data.index);
    } else {
      this.data.index = 0;
      this.slickModal.slickGoTo(this.data.index);
    }
  }
  afterChange(event) {
    this.data.index = event.currentSlide;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
