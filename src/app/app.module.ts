import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardService } from './services/dashboard.service';
import { DialogComponent } from './dashboard/dialog/dialog.component';
import { ArchiveDialogComponent } from './dashboard/archive-data/archive.component';
import { ContractorsComponent } from './contractors/contractor.component';
import { LocateComponent } from './dashboard/locate/locate.component';
import { SiteDetailsComponent } from './comman/site-details/site-details.component';
import { EditSiteComponent } from './dashboard/edit-site/edit.component';
import { ContractorSiteComponent } from './contractor-site/contractor-site.component';
import { ContractorDialogComponent } from './dashboard/contractor/contractor.component';

import { SlickModule } from 'ngx-slick';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { SiteDetailDialogComponent } from './dashboard/site-detail-dialog/site-detail-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContractorService } from './services/contractor.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './services/auth.guard';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    ContractorsComponent,
    LocateComponent,
    SiteDetailsComponent,
    EditSiteComponent,
    SiteDetailDialogComponent,
    LoginPageComponent,
    ContractorSiteComponent,
    HeaderComponent,
    ContractorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatProgressSpinnerModule,
    SlickModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    DashboardService,
    ContractorService,
    AuthGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    ArchiveDialogComponent,
    LocateComponent,
    EditSiteComponent,
    SiteDetailDialogComponent,
    ContractorDialogComponent
  ]
})

export class AppModule { }
