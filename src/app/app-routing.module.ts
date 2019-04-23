import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContractorsComponent } from './contractors/contractor.component';
import { ContractorSiteComponent } from './contractor-site/contractor-site.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contractors', component: ContractorsComponent },
  { path: 'sitedetails/:contractorId', component: ContractorSiteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
