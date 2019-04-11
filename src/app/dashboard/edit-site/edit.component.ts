import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { ISiteData } from '../../interfaces/site';
import { IContractor } from '../../interfaces/contractor';

import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-edit-site-modal',
  templateUrl: 'edit.html',
  styleUrls: ['./edit.css']
})
export class EditSiteComponent implements OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  constructor(private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<EditSiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [ISiteData, IContractor[]]) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    var geocoder = new google.maps.Geocoder();
    var address = `${this.data[0].address},${this.data[0].locality},${this.data[0].city},${this.data[0].state}`;
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log("location", results[0].geometry.location);
        console.log(results[0].geometry);
        // uncomment this after getting google maps key
        //   this.newSite.lat_Long_True = `${results[0].geometry.location.latitude}, ${results[0].geometry.location.longitude}`
        this.dashboardService.updateSiteData(this.data[0]).pipe(
          map(result => {
            this.dialogRef.close();
          }),
          takeUntil(this.unsubscribe)
        ).subscribe();
      } else {
        alert("We are unable to get your location. Please enter correct location.");
      }
    });

  }

  ngOnDestroy() {
    console.log('ngOnDestory');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
