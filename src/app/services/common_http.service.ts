import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  constructor(private http: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({
       'Authorization': 'bearer' + localStorage.getItem('token'),
       'Content-Type':  'application/json'
     })
   };

  public get(url: string) {
    return this.http.get(url);
  }

  public post(url, postObj) {
    return this.http.post(url, postObj);
  }
}
