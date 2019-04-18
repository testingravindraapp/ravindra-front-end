import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/login';
import { CommonHttpService } from './common_http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private _loginUrl = 'https://ravindra-back.herokuapp.com/login';

    options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    constructor(private router: Router, private common_http: HttpClient  ) { }

    public loginUser(user): Observable<ILogin> {
        const body = new URLSearchParams();
        body.set('email', user.email);
        body.set('password', user.password);
        return this.common_http.post<ILogin>(this._loginUrl, body.toString(), this.options);
    }

    public getToken(): string {
       return localStorage.getItem('token');
     }

    public loggedIn(): boolean {
        return !!localStorage.getItem('token');
     }

    public Logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }


}


