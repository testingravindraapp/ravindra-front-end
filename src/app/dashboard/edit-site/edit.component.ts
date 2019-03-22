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

  constructor( private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<EditSiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [ISiteData, IContractor[]]) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
      this.dashboardService.updateSiteData(this.data[0]._id,
        this.data[0].location, this.data[0].lat_Long_True,
        this.data[0].contractorId).pipe(
            takeUntil(this.unsubscribe),
            map(result => {
                this.dialogRef.close();
            })
        ).subscribe();
    }

    ngOnDestroy() {
        console.log('ngOnDestory');
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
