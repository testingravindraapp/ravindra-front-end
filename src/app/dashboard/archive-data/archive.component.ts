import { Component, Inject, OnInit, ViewChild, AfterContentChecked, OnDestroy } from '@angular/core';
import { MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ISiteData } from '../../interfaces/site';
import { ArchiveDataService } from '../../services/archive-data.service';
import { DashboardService } from '../../services/dashboard.service';
@Component({
    selector: 'app-archive-modal',
    templateUrl: 'archive.html',
    styleUrls: ['./archive.css']
})
export class ArchiveDialogComponent implements OnInit, AfterContentChecked, OnDestroy {
    displayedColumns: string[] = ['select', 'siteId', 'location', 'contractorId', 'submittedOn', 'image'];
    selection = new SelectionModel<ISiteData>(true, []);
    @ViewChild('archiveRemoveBtn') archiveRemoveBtn: HTMLButtonElement;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private unsubscribe: Subject<void> = new Subject();

    constructor(public dialogRef: MatDialogRef<ArchiveDialogComponent>,
        private dataService: ArchiveDataService,
        private dashboardService: DashboardService,
        @Inject(MAT_DIALOG_DATA) public dataSource: MatTableDataSource<ISiteData>) { }

    ngAfterContentChecked() {
        this.selection.selected.length > 0 ? this.archiveRemoveBtn.disabled = false : this.archiveRemoveBtn.disabled = true;
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }
    removeArchive() {
        const arrId = [];
        const data = this.dataSource.data.filter(row => {
            if (this.selection.isSelected(row)) {
                arrId.push(row._id);
            }
            return this.selection.isSelected(row);
        });
        this.dataSource.data = this.dataSource.data.filter(row => {
            return !this.selection.isSelected(row);
        });
        this.dashboardService.updateArchive(arrId, 'false').pipe(
            takeUntil(this.unsubscribe)
        ).subscribe();
        this.dataService.changeSiteData(data);
        this.dataService.changeArchivedSiteData(this.dataSource.data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        if (this.dataSource) {
            const numRows = this.dataSource.data.length;
            return numSelected === numRows;
        }
    }

    masterToggle() {
        // this.selection.selected.length > 0 ? this.archiveBtn.disabled = false : this.archiveBtn.disabled = true;
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

    ngOnDestroy() {
        console.log('ngOnDestory');
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
