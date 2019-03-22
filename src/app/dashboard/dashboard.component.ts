import { Component, OnInit, ViewChild, AfterContentChecked, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { MatSort, MatDialog, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';

import { DialogComponent } from './dialog/dialog.component';
import { ArchiveDialogComponent } from './archive-data/archive.component';
import { ContractorDialogComponent } from './contractor/contractor.component';
import { LocateComponent } from './locate/locate.component';
import { EditSiteComponent } from './edit-site/edit.component';

import { ArchiveDataService } from '../services/archive-data.service';
import { DashboardService } from '../services/dashboard.service';

import { ISiteData } from '../interfaces/site';
import { IContractor } from '../interfaces/contractor';

import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit, AfterContentChecked, OnDestroy {
    displayedColumns: string[] = ['select', 'siteId', 'location', 'map', 'contractorId', 'submittedOn', 'image', 'edit'];
    dataSource: MatTableDataSource<ISiteData>;
    showInput: Boolean = false;
    newSite: ISiteData;
    archiveData: ISiteData[];
    selected = '';
    selection = new SelectionModel<ISiteData>(true, []);
    contractorsList: IContractor[];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('archiveBtn') archiveBtn: HTMLButtonElement;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    private unsubscribe: Subject<void> = new Subject();

    constructor(private dashboardService: DashboardService,
        private archiveDataService: ArchiveDataService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private ngxService: NgxUiLoaderService) {
        this.contractorsList = [];
        this.newSite = {
            location: '',
            siteId: null,
            contractorId: null,
            image: '',
            submittedOn: null,
            status: 'Submitted',
            lat_Long_True: ''
        };
        this.archiveData = new Array;
    }

    ngOnInit() {
        this.ngxService.startLoader('loader-01');
        this.archiveDataService.currentSiteData.pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(message => {
            if (this.dataSource) {
                const data: ISiteData[] = this.dataSource.data;
                message.forEach(element => {
                    data.push(element);
                });
                data.sort(function (a, b) {
                    return b.siteId - a.siteId;
                });
                this.dataSource.data = data;
            }
        });
        this.archiveDataService.currentArchivedSiteData.pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(message => {
            if (this.dataSource) {
                const data = [];
                message.forEach(element => {
                    data.push(element);
                });
                data.sort(function (a, b) {
                    return b.siteId - a.siteId;
                });
                this.archiveData = data;
            }
        });
        this.dashboardService.getActiveSites().pipe(
            takeUntil(this.unsubscribe),
            map(data => {
                data.map((item, index) => {
                    // item.position = index + 1;
                    if (item.imageURL && item.imageURL !== '') {
                        item.imageURL = item.imageURL.split(',');
                    }
                });

                data.sort(function (a, b) {
                    return b.siteId - a.siteId;
                });

                console.log('active data', data);
                // this.tmpdata = data;
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
                this.ngxService.stopLoader('loader-01');
            })
        ).subscribe();

        this.dashboardService.getArchivedSites().pipe(
            takeUntil(this.unsubscribe),
            map(data => {
                data.map((item, index) => {
                    if (item.imageURL && item.imageURL !== '') {
                        item.imageURL = item.imageURL.split(',');
                    }
                });
                console.log('archive data...', data);
                data.sort(function (a, b) {
                    return b.siteId - a.siteId;
                });
                this.archiveData = data;
            })
        ).subscribe();

        this.dashboardService.getContractors().pipe(
            map(data => {
                this.contractorsList = data;
            })).subscribe();
    }

    ngAfterContentChecked() {
        this.selection.selected.length > 0 ? this.archiveBtn.disabled = false : this.archiveBtn.disabled = true;
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

    addNewEntry() {
        const maxId = this.dataSource.data
            .reduce((max, p) => p.siteId > max ? p.siteId : max, this.dataSource.data[0].siteId);
        this.newSite.siteId = maxId.toString() !== 'null' ? Number(maxId) + 1 : 1;

        if (this.newSite.siteId !== null && this.newSite.contractorId !== null && this.newSite.location !== '') {
            const newSite: ISiteData = {
                siteId: this.newSite.siteId,
                contractorId: this.newSite.contractorId,
                location: this.newSite.location.trim(),
                image: null, status: 'Open',
                submittedOn: null,
                lat_Long_True: this.newSite.lat_Long_True.trim()
            };
            this.dashboardService.createNewSite(newSite).pipe(
                map(data => {
                    newSite._id = data._id;
                    const tmpdata = this.dataSource.data;
                    tmpdata.unshift(newSite);
                    this.dataSource.data = tmpdata;
                    // this.dataSource = new MatTableDataSource(this.tmpdata);
                    this.newSite = {
                        location: '',
                        siteId: null,
                        contractorId: null,
                        image: '',
                        submittedOn: null,
                        lat_Long_True: ''
                    };
                    this.showInput = false;
                    this.snackBar.open(`New site with site id ${data.siteId} is added`, 'Ok', {
                        duration: 4000,
                    });
                })
            ).subscribe();
        }
    }
    removeDuplicates(arr) {
        const unique_array = [];
        for (let i = 0; i < arr.length; i++) {
            if (unique_array.indexOf(arr[i]) === -1) {
                unique_array.push(arr[i]);
            }
        }
        return unique_array;
    }

    showContractors() {
        const activeContractors = this.removeDuplicates(this.dataSource.data.map(item => {
            return item.contractorId;
        }));
        this.removeDuplicates(this.archiveData.map(item => {
            activeContractors.push(item.contractorId);
        }));
        const dialogRef = this.dialog.open(ContractorDialogComponent, {
            width: '400px',
            height: '550px',
            data: [this.contractorsList, activeContractors]
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
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

    checkboxLabel(row?: ISiteData): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.siteId + 1}`;
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

    openMap(data: ISiteData) {
        if (data.lat_Long_True !== '') {
            const dialogRef = this.dialog.open(LocateComponent, {
                width: '80%',
                height: '510px',
                data: data
            });
            dialogRef.afterClosed().subscribe(result => {
                // this.archiveData.length = 0;
                console.log('The dialog was closed');
            });
        } else {
            this.snackBar.open('Please enter the latitude and longitude separated by ",".', 'Ok', {
                duration: 4000,
            });
        }
    }

    openSiteEdit(data: ISiteData) {
        const dialogRef = this.dialog.open(EditSiteComponent, {
            width: '300px',
            height: '330px',
            data: [data, this.contractorsList]
        });
        dialogRef.afterClosed().subscribe(result => {
            // this.archiveData.length = 0;
            console.log('The dialog was closed');
        });

    }

    ngOnDestroy() {
        console.log('ngOnDestory');
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
