import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { IContractor } from '../interfaces/contractor';
import { ISiteData } from '../interfaces/site';

import { DashboardService } from '../services/dashboard.service';
import { ContractorService } from '../services/contractor.service';
import { ArchiveDataService } from '../services/archive-data.service';

import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-contractor',
    templateUrl: 'contractor.html',
    styleUrls: ['./contractor.css']
})
export class ContractorsComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['name', 'passcode'];
    dataSource: MatTableDataSource<IContractor>;
    showInput = false;
    newContr: IContractor;
    // contractors: IContractor[];
    activeContractors: IContractor[];
    activeSites: ISiteData[];
    archiveSites: ISiteData[];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private unsubscribe: Subject<void> = new Subject();

    constructor(private dashboardService: DashboardService,
        private contractorService: ContractorService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dataService: ArchiveDataService,
        private ngxService: NgxUiLoaderService) {
        this.newContr = {
            name: '',
            contractorId: null,
            passcode: null
        };
    }

    ngOnInit() {
        this.ngxService.startLoader('loader-01');
        // this.activeContractors = JSON.parse(this.route.snapshot.params["activeContractors"]);
        this.dashboardService.getActiveSites().pipe(
            map(data => {
                data.map((item, index) => {
                    if (item.imageURL && item.imageURL !== '') {
                        item.imageURL = item.imageURL.split(',');
                    }
                });
                data.sort(function (a, b) {
                    return b.siteId - a.siteId;
                });
                console.log('active data', data);
                this.activeSites = data;
                this.dataService.changeSiteData(data);
                
            }),
            takeUntil(this.unsubscribe)
        ).subscribe();

        this.dashboardService.getArchivedSites().pipe(
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
                this.archiveSites = data;
                this.dataService.changeArchivedSiteData(data);
            }),
            takeUntil(this.unsubscribe)
        ).subscribe();

        this.contractorService.getContractors().subscribe(data => {
            console.log('ontractor', data);
            // this.contractors = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.dataService.setContractorData(this.dataSource.data);
            if (this.dataSource.data.length === 0) {
                this.newContr.contractorId = 1;
            } else {
                const maxId = this.dataSource.data
                    .reduce((max, p) => p.contractorId > max ? p.contractorId : max, this.dataSource.data[0].contractorId);
                this.newContr.contractorId = maxId.toString() !== 'null' ? Number(maxId) + 1 : 1;
            }
            this.ngxService.stopLoader('loader-01');
        });
    }

    addContractor() {
        if (this.newContr.name !== '') {
            this.dashboardService.addContractors(this.newContr.contractorId, this.newContr.name).pipe(
                map(result => {
                    console.log(result);
                    const data = this.dataSource.data;
                    data.push({ name: this.newContr.name, contractorId: this.newContr.contractorId, _id: result._id, passcode: result.passcode });
                    this.dataSource.data = data;
                    this.dataService.setContractorData(data);
                    this.newContr = {
                        name: '',
                        contractorId: Number(this.newContr.contractorId) + 1
                    };
                }),
                takeUntil(this.unsubscribe)
            ).subscribe();
        }
    }

    deleteContractor(id) {
        event.stopPropagation();
        const allSites = [...this.activeSites, ...this.archiveSites]
        console.log('allSites', allSites);

        let activeContractors = this.removeDuplicates(allSites.map(item => {
            return item.contractorId;
        }));
        activeContractors = activeContractors.filter(item => {
            return Number(item) === id;
        })

        console.log('activeContractors', activeContractors);
        // const ind = activeContractors.indexOf(id.toString());
        if (activeContractors.length === 0) {
            let del: IContractor;
            let delInd: number;
            this.dataSource.data.map((item, index) => {
                if (item.contractorId === id) {
                    del = item;
                    delInd = index;
                }
            });
            this.dashboardService.delContractors(del._id).pipe(
                takeUntil(this.unsubscribe)
            ).subscribe(data => {
                console.log('deletedC', data);
            });
            let newContData = this.dataSource.data;
            newContData.splice(delInd, 1);
            this.dataSource.data = newContData;
            this.dataService.setContractorData(newContData);
        } else {
            this.snackBar.open('This record cannot be deleted as this contractor has assigned sites to it.', 'Ok', {
                duration: 10000,
            });
        }
    }

    ngOnDestroy() {
        console.log('ngOnDestory');
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    openDetails(contractorId, name) {
        this.router.navigate(['/sitedetails', contractorId, name])
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

   
}
