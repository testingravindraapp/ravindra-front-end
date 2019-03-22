import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { IContractor } from '../../interfaces/contractor';

import { DashboardService } from '../../services/dashboard.service';
@Component({
    selector: 'app-contractor-modal',
    templateUrl: 'contractor.html',
    styleUrls: ['./contractor.css']
})
export class ContractorDialogComponent implements OnInit, OnDestroy {
    showInput = false;
    newContr: IContractor;
    private unsubscribe: Subject<void> = new Subject();

    constructor(public dialogRef: MatDialogRef<ContractorDialogComponent>,
        private dashboardService: DashboardService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public contractors: [IContractor[], string[]]) {
        this.newContr = {
            name: '',
            contractorId: null
        };
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        if (this.contractors[0].length === 0) {
            this.newContr.contractorId = 1;
        } else {
            const maxId = this.contractors[0]
                .reduce((max, p) => p.contractorId > max ? p.contractorId : max, this.contractors[0][0].contractorId);
            this.newContr.contractorId = maxId.toString() !== 'null' ? Number(maxId) + 1 : 1;
        }
    }

    addContractor() {
        if (this.newContr.name !== '') {
            this.dashboardService.addContractors(this.newContr.contractorId, this.newContr.name).pipe(
                takeUntil(this.unsubscribe),
                map(result => {
                    console.log(result);
                    const data = this.contractors[0];
                    data.push({ name: this.newContr.name, contractorId: this.newContr.contractorId, _id: result._id });
                    this.contractors[0] = data;
                    this.newContr = {
                        name: '',
                        contractorId: Number(this.newContr.contractorId) + 1
                    };
                })
            ).subscribe();
        }
    }

    deleteContractor(id) {
        const ind = this.contractors[1].indexOf(id.toString());
        if (ind === -1) {
            let del: IContractor;
            let delInd: number;
            this.contractors[0].map((item, index) => {
                if (item.contractorId === id) {
                    del = item;
                    delInd = index;
                }
            });
            this.dashboardService.delContractors(del._id).pipe(
                takeUntil(this.unsubscribe)
            ).subscribe();
            this.contractors[0].splice(delInd, 1);
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
}
