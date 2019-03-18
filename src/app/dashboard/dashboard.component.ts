import { Component, OnInit, ViewChild } from '@angular/core';

import { DashboardService } from '../services/dashboard.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

export interface DialogData {
    name: string;
}
export interface ISiteData {
    location: string;
    siteId: number;
    contractorId: number;
    image: string;
    submittedOn: Date;
    status?: string;
}
// const ELEMENT_DATA: ISiteData[] = [
//     { siteId: 1, location: 'Hydrogen', contractorId: 1.0079, image: 'H', submittedOn:  },
//     { siteId: 2, location: 'Helium', contractorId: 4.0026, image: 'He' },
//     { siteId: 3, location: 'Lithium', contractorId: 6.941, image: 'Li' },
//     { siteId: 4, location: 'Beryllium', contractorId: 9.0122, image: 'Be' },
//     { siteId: 5, location: 'Boron', contractorId: 10.811, image: 'B' },
//     { siteId: 6, location: 'Carbon', contractorId: 12.0107, image: 'C' },
//     { siteId: 7, location: 'Nitrogen', contractorId: 14.0067, image: 'N' },
//     { siteId: 8, location: 'Oxygen', contractorId: 15.9994, image: 'O' },
//     { siteId: 9, location: 'Fluorine', contractorId: 18.9984, image: 'F' },
//     { siteId: 10, location: 'Neon', contractorId: 20.1797, image: 'Ne' },
// ];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
    displayedColumns: string[] = ['siteId', 'location', 'contractorId', 'submittedOn', 'image'];
    dataSource: MatTableDataSource<any>;
    showInput: Boolean = false;
    newSite: ISiteData;
    tmpdata: any;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private dashboardService: DashboardService, public dialog: MatDialog) {
        this.newSite = {
            location: '',
            siteId: null,
            contractorId: null,
            image: '',
            submittedOn: null,
            status: 'Submitted'
        };
    }

    ngOnInit() {
        this.dashboardService.getAllSites().pipe(
            map(data => {
                console.log(data);
                data.map(item => {
                    if (item.imageURL && item.imageURL !== '') {
                        item.imageURL = item.imageURL.split(',');
                    }
                });
                this.tmpdata = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.sort = this.sort;
            })
        ).subscribe();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDialog(elem): void {
        console.log(event);
        // let elem: Array<string> = event.target.src.split('/');
        // console.log(elem[elem.length - 1]);
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '600px',
            height: '650px',
            data: { name: elem.imageURL, siteId: elem.siteId, location: elem.location, contractorId: elem.contractorId }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }
    addNewEntry() {
        if (this.newSite.siteId !== null && this.newSite.contractorId !== null && this.newSite.location !== '') {
            this.tmpdata.unshift({ siteId: this.newSite.siteId, contractorId: this.newSite.contractorId, location: this.newSite.location, status: 'Open' });
            this.dataSource = new MatTableDataSource(this.tmpdata);
            this.newSite = {
                location: '',
                siteId: null,
                contractorId: null,
                image: '',
                submittedOn: null
            };
            this.showInput = false;
        }
    }

}
