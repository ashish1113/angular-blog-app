import { Injectable } from '@angular/core';
//import { Observable } from "rxjs";
//import {Observable} from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Cookie} from 'ng2-cookies/ng2-cookies';


//import {catchError} from 'rxjs/operators';
//import {tap} from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import {HttpClient ,HttpHeaders} from '@angular/common/http';

import {HttpErrorResponse ,HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "https://chatapi.edwisor.com";
  

  constructor( public http :HttpClient) { }


  public getUserInfoFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data) =>{
    localStorage.setItem('userInfo',JSON.stringify(data))
  }

  public signupFuntion(data): Observable<any> {
      const params =new HttpParams()
    .set('firstname',data.firstname)
    .set('lastname',data.lastname)
    .set('mobile',data.mobile)
    .set('email',data.email)
    .set('password',data.password)
    .set ('apiKey',data.apiKey);

    return this.http.post(`${this.url}/api/v1/users/signup`,params);

    

  }

  public signinFunction(data):Observable<any>{
    const params =new HttpParams()
    .set('email',data.email)
    .set('password',data.password);
    return this.http.post(`${this.url}/api/v1/users/login`,params);

  }

  public logout():Observable <any> {
    const params =new HttpParams()
    .set('authToken',Cookie.get('authtoken'));
    return this.http.post(`${this.url}/api/v1/users/logout`,params);
  }
}
