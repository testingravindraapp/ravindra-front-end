import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Event, NavigationStart } from '@angular/router';

import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

import { AppSettings } from './util/config';

import { ISiteData } from '../interfaces/site';
@Injectable()
export class ContractorService {
    options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    localStr = localStorage.getItem('token');
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
}
