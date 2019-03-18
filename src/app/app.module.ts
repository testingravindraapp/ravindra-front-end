import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardService } from './services/dashboard.service';
import { DialogComponent } from './dashboard/dialog/dialog.component';

import { SliderModule } from 'angular-image-slider';
import { SlickModule } from 'ngx-slick';

import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    SliderModule,
    SlickModule.forRoot(),
    MatSelectModule
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ]
})

export class AppModule { }
