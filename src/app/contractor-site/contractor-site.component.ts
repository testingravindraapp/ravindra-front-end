import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { MatSort, MatDialog, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';

import { ArchiveDataService } from '../services/archive-data.service';

import { ISiteData } from '../interfaces/site';

@Component({
  selector: 'app-contractor-site',
  templateUrl: './contractor-site.html',
  styleUrls: ['./contractor-site.css']
})
export class ContractorSiteComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['select', 'address', 'map', 'contractorId', 'submittedOn', 'image', 'edit'];
  dataSource: MatTableDataSource<ISiteData>;
  archiveData: ISiteData[];

  private unsubscribe: Subject<void> = new Subject();

  constructor(private archiveDataService: ArchiveDataService) { }

  ngOnInit() {
    this.archiveDataService.currentSiteData.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(archSiteData => {
      // if (this.dataSource) {
        const data: ISiteData[] = [];
        archSiteData.forEach(element => {
          data.push(element);
        });
        data.sort(function (a, b) {
          return b.siteId - a.siteId;
        });
        this.dataSource.data = data;
      // }
    });
    this.archiveDataService.currentArchivedSiteData.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(siteData => {
      if (this.dataSource) {
        const data = [];
        siteData.forEach(element => {
          data.push(element);
        });
        data.sort(function (a, b) {
          return b.siteId - a.siteId;
        });
        this.archiveData = data;
      }
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestory');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
