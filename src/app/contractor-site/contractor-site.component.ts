import { Component, OnInit, OnDestroy, ViewChild, AfterContentChecked } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { MatSort, MatDialog, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';

import { ArchiveDataService } from '../services/archive-data.service';
import { DashboardService } from '../services/dashboard.service';

import { ISiteData } from '../interfaces/site';

import { DialogComponent } from '../dashboard/dialog/dialog.component';
import { ArchiveDialogComponent } from '../dashboard/archive-data/archive.component';
import { SiteDetailDialogComponent } from '../dashboard/site-detail-dialog/site-detail-dialog.component';
import { IContractor } from '../interfaces/contractor';

@Component({
  selector: 'app-contractor-site',
  templateUrl: './contractor-site.html',
  styleUrls: ['./contractor-site.css']
})
export class ContractorSiteComponent implements OnInit, AfterContentChecked, OnDestroy {
  displayedColumns: string[] = ['select', 'address', 'map', 'contractorId', 'submittedOn', 'image', 'approve', 'edit'];
  dataSource: MatTableDataSource<ISiteData>;
  archiveData: ISiteData[];
  selection = new SelectionModel<ISiteData>(true, []);
  contractorId: number;
  contractorName: string;
  newSite: ISiteData;
  contractorList: IContractor[];
  selected = '';

  private unsubscribe: Subject<void> = new Subject();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('archiveBtn') archiveBtn: HTMLButtonElement;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private dataService: ArchiveDataService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.newSite = {
      siteId: null,
      contractorId: null,
      image: '',
      submittedOn: null,
      status: 'Submitted',
      lat_Long_True: '',
      address: '',
    };
  }

  ngOnInit() {
    this.contractorId = Number(this.route.snapshot.params['contractorId']);
    this.contractorName = this.route.snapshot.params['name'];
    this.dataService.contractorData.subscribe(data => {
      this.contractorList = data;
    });
    this.dataService.currentSiteData.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(archSiteData => {
      let data: ISiteData[] = [];
      // archSiteData.forEach(element => {
      //   data.push(element);
      // });

      data = archSiteData.filter(item => {
        return Number(item.contractorId) === this.contractorId;
      });
      data.sort(function (a, b) {
        return b.siteId - a.siteId;
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (dataX: any, filtersJson: string) => {
        const matchFilter = [];
        const filters = JSON.parse(filtersJson);
        filters.forEach(filter => {
          const val = dataX[filter.id] === null ? '' : dataX[filter.id];
          if (val !== undefined) {
            matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
          }
        });
        return matchFilter.every(Boolean);
      };
      // }
    });
    this.dataService.currentArchivedSiteData.pipe(
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
  ngAfterContentChecked() {
    this.selection.selected.length > 0 ? this.archiveBtn.disabled = false : this.archiveBtn.disabled = true;
  }
  ngOnDestroy() {
    console.log('ngOnDestory');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  checkboxLabel(row?: ISiteData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.siteId + 1}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource) {
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  openDialog(elem, i): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      height: '670px',
      data: { name: elem.imageURL, siteId: elem.siteId, location: elem.location, contractorId: elem.contractorId, index: i }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  showArchive() {
    console.log('archive data', this.archiveData);
    const dialogRef = this.dialog.open(ArchiveDialogComponent, {
      width: '80%',
      height: '650px',
      data: new MatTableDataSource(this.archiveData)
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.archiveData.length = 0;
      console.log('The dialog was closed');
    });
  }

  addNewEntry() {
    const allSites = [...this.dataSource.data, ...this.archiveData];

    const maxId = allSites
      .reduce((max, p) => p.siteId > max ? p.siteId : max, allSites[0].siteId);
    this.newSite.siteId = maxId.toString() !== 'null' ? Number(maxId) + 1 : 1;
    if (this.newSite.siteId !== null && this.newSite.lat_Long_True !== '' && this.newSite.address !== '') {
      const newSite: ISiteData = {
        siteId: this.newSite.siteId,
        contractorId: this.newSite.contractorId,
        image: null,
        submittedOn: null,
        status: 'pending',
        lat_Long_True: this.newSite.lat_Long_True.trim(),
        address: this.newSite.address,
      };
      this.dashboardService.createNewSite(newSite).pipe(
        map((data) => {
          newSite._id = data._doc._id;
          const tmpdata = this.dataSource.data;
          tmpdata.unshift(newSite);
          this.dataSource.data = tmpdata;
          this.newSite = {
            // location: '',
            siteId: null,
            contractorId: null,
            image: '',
            submittedOn: null,
            lat_Long_True: '',
            address: '',
          };
          this.snackBar.open(`New site with site id ${data._doc.siteId} is added`, 'Ok', {
            duration: 4000,
          });
        })
      ).subscribe();
    }
  }
  archive() {
    const arrId = [];
    const arrSiteId = [];
    this.dataSource.data = this.dataSource.data.filter(row => {
      if (this.selection.isSelected(row)) {
        arrId.push(row._id);
        arrSiteId.push(` ${row.siteId}`);
        this.archiveData.push(row);
      }
      return !this.selection.isSelected(row);
    });
    this.dashboardService.updateArchive(arrId, 'true').pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(result => {
      this.snackBar.open(`Site Id${arrSiteId} added to archive`, 'Ok', {
        duration: 4000,
      });
    });
    this.selection.clear();
  }

  OpenDialogToEnterSite() {
    const dialogRef = this.dialog.open(SiteDetailDialogComponent, { panelClass: 'my-panel' });
    this.newSite.contractorId = this.contractorId;
    // this.newSite.contractorId = this.contractorId;

    dialogRef.componentInstance['data'] = [this.newSite, this.contractorId, this.contractorName];
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewEntry();
      }
    });
  }

  approve(id) {
    this.dashboardService.setApproved(id).subscribe(data => {
      console.log(data);
    });
  }

  applyFilter(filterValue: string) {
    if (filterValue !== '') {
      const tableFilters = [];
      tableFilters.push({
        id: this.selected,
        value: filterValue
      });
      // this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(tableFilters);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.dataSource.filter = '';
    }
  }
}
