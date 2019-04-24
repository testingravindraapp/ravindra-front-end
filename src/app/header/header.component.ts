import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSort, MatDialog, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';

import { LoginService } from '../services/login.service';
import { SiteDetailDialogComponent } from '../dashboard/site-detail-dialog/site-detail-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public dialog: MatDialog;

  constructor(public router: Router,
    public loginService: LoginService, ) { }

  showContractors() {
    this.router.navigate(['/contractors']);
  }

}
