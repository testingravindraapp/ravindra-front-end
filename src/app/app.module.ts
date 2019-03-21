import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardService } from './services/dashboard.service';
import { DialogComponent } from './dashboard/dialog/dialog.component';
import { ArchiveDialogComponent } from './dashboard/archive-data/archive.component';
import { ContractorDialogComponent } from './dashboard/contractor/contractor.component';

import { SlickModule } from 'ngx-slick';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#ffd740',
  pbColor: '#ffd740'
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DialogComponent,
    ArchiveDialogComponent,
    ContractorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppMaterialModule,
    SlickModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    ArchiveDialogComponent,
    ContractorDialogComponent
  ]
})

export class AppModule { }
