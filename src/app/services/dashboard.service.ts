import { Injectable } from '@angular/core';
import {
    HttpClient, HttpHeaders
} from '@angular/common/http';

import {
    Router,
    Event,
    NavigationStart
} from '@angular/router';

import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { SERVICE_BASE_URL } from './util/constants';


@Injectable()
export class DashboardService {

    // private accountOpeningFormType = 'aop';
    // private folioApiServices: FolioApiServices;
    // private loginSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(protected http: HttpClient,
        private router: Router
    ) {

    }

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
        return this.http.get(`${SERVICE_BASE_URL}/sites`, {}).pipe(
            map(this.extractDataRes),
            catchError((err: any) => {
                alert('Something went wrong. Please try again later.');
                return err;
            })
        );
    }
}
