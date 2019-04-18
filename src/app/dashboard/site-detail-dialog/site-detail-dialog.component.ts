import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ISiteData } from '../../interfaces/site';
import { IContractor } from '../../interfaces/contractor';
@Component({
  selector: 'app-site-detail-dialog',
  templateUrl: './site-detail-dialog.component.html',
  styleUrls: ['./site-detail-dialog.component.css']
})
export class SiteDetailDialogComponent implements OnInit {
latitude: number;
longitude: number;
  constructor(private dialogRef: MatDialogRef<SiteDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [ISiteData, IContractor[]]) { }

  ngOnInit() {
    console.log(this.data);

  }

  setLatLong(): void {
    this.data[0].lat_Long_True = `${this.latitude}, ${this.longitude}`;
  }
  close() {
    this.dialogRef.close();
  }

}
