import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule
  ]
})
export class AppMaterialModule { }
