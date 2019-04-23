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

import { SlickModule } from 'ngx-slick';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { SiteDetailDialogComponent } from './dashboard/site-detail-dialog/site-detail-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContractorService } from './services/contractor.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

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
    ContractorSiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SlickModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    DashboardService,
    ContractorService,
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
    SiteDetailDialogComponent
  ]
})

export class AppModule { }
