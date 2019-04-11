import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Event, NavigationStart } from '@angular/router';

import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

import { AppSettings } from './util/config';

import { ISiteData } from '../interfaces/site';
@Injectable()
export class DashboardService {
    options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    constructor(protected http: HttpClient,
        private router: Router
    ) { }

    private extractDataRes(res: Response) {
        const body = res;
        return body || {};
    }

    protected handleError(error: Response | any) {
        let errStatus: any;

        if (error instanceof Response) {
            errStatus = {
                statusCode: error.status,
                statusMessage: (error.status === 0 ? 'Connection Refused' : `${error.statusText || ''}`)
            };

        } else {
            errStatus = {
                statusCode: 500,
                statusMessage: error.message ? error.message : error.toString()
            };
        }

        return Observable.throw(errStatus);
    }



    public getAllSites(): Observable<any> {
        console.log('getAllSites............................');
        return this.http.get(`${AppSettings.SERVICE_BASE_URL}/sites`, {}).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }

    public getActiveSites(): Observable<any> {
        console.log('getActiveSites............................');
        return this.http.get(`${AppSettings.SERVICE_BASE_URL}/activeSites`, {}).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }

    public getArchivedSites(): Observable<any> {
        console.log('getArchivedSites............................');
        return this.http.get(`${AppSettings.SERVICE_BASE_URL}/archivedSites`, {}).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }

    public updateArchive(arrId, archived): Observable<any> {
        const body = new URLSearchParams();
        body.set('id', arrId);
        body.set('archived', archived);

        console.log('updateArchive............................');
        return this.http.post(`${AppSettings.SERVICE_BASE_URL}/updateArchive`, body.toString(), this.options).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }

    public updateSiteData(data: ISiteData): Observable<any> {
        const body = new URLSearchParams();
        body.set('id', data._id);
        body.set('address', data.address);
        body.set('locality', data.locality);
        body.set('city', data.city);
        body.set('state', data.state);
        body.set('latLong', data.lat_Long_True);
        body.set('cId', data.contractorId.toString());
        console.log('updateSiteData............................', body.toString());
        return this.http.post(`${AppSettings.SERVICE_BASE_URL}/updateSiteData`, body.toString(), this.options).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }

    public getContractors(): Observable<any> {
        console.log('getContractors............................');
        return this.http.get(`${AppSettings.SERVICE_BASE_URL}/contractors`, {}).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }

    public addContractors(contractorId, name): Observable<any> {
        const body = new URLSearchParams();
        body.set('contractorId', contractorId);
        body.set('name', name);

        console.log('addContractors............................');
        return this.http.post(`${AppSettings.SERVICE_BASE_URL}/addContractors`, body.toString(), this.options).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }

    public delContractors(id): Observable<any> {
        const body = new URLSearchParams();
        body.set('id', id);

        console.log('deleteContractors............................');
        return this.http.post(`${AppSettings.SERVICE_BASE_URL}/deleteContractors`, body.toString(), this.options).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }

    public createNewSite(newSite: ISiteData): Observable<any> {
        const body = new URLSearchParams();
        // body.set('location', newSite.location);
        body.set('siteId', newSite.siteId.toString());
        body.set('contractorId', newSite.contractorId.toString());
        body.set('lat_Long_True', newSite.lat_Long_True); 
        body.set('address', newSite.address);
        body.set('locality', newSite.locality);
        body.set('city', newSite.city);
        body.set('state', newSite.state);


        console.log('createNewSite............................');
        return this.http.post(`${AppSettings.SERVICE_BASE_URL}/createNewSite`, body.toString(), this.options).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }
}
