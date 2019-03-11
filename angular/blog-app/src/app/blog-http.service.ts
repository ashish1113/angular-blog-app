import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {Observable} from "rxjs";         //observale no in new v
import {catchError} from 'rxjs/operators';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {

 
  public allBlogs;
  //public currentBlogId :any;
  public baseUrl = 'https://blogapp.edwisor.com/api/v1/blogs';
  public authKeyMe="ZTc3OWU3ZTI3OWU3Y2IzMDQzNTY3Mzc4YTQyYjUwODNhMzIzNGMyNjJhZTY3NmY4ODNmOTcyYTZhMDZmYmJmNWM5YjFmN2Y1Nzg2ZmQ0NmI5OTU5OWYxMWNkNWI1NzgxYzc2YjRkZmQ1YjE5ZDMxMzMzYzUwOGE3M2VhZjMzM2NiOQ==";

  constructor( private _http:HttpClient) {
    console.log("blog -http service was called")
  }

  private handleError(err:HttpErrorResponse){
    console.log("handle error Http calls ");
    console.log(err.message);
    return Observable.throw(err.message);
  }

  public getAllBlogs(): any {
    
    let myResponse =this._http.get(this.baseUrl+'/all?authToken=ZTc3OWU3ZTI3OWU3Y2IzMDQzNTY3Mzc4YTQyYjUwODNhMzIzNGMyNjJhZTY3NmY4ODNmOTcyYTZhMDZmYmJmNWM5YjFmN2Y1Nzg2ZmQ0NmI5OTU5OWYxMWNkNWI1NzgxYzc2YjRkZmQ1YjE5ZDMxMzMzYzUwOGE3M2VhZjMzM2NiOQ==');
    console.log(myResponse);
    return myResponse;


  }
  public getSingleBlogInformation(currentBlogId): any {

    let myResponse =this._http.get(this.baseUrl+'/view'+'/'+currentBlogId+'?authToken='+this.authKeyMe);
    console.log(myResponse);
    return myResponse;
  }
  public createBlog(blogdata): any {
    let myResponse =this._http.post(this.baseUrl+'/create'+'?authToken='+this.authKeyMe,blogdata);
    return myResponse;

  }

  public deleteBlog(blogId): any {
    let data={};
    let myResponse =this._http.post(this.baseUrl+'/'+blogId+'/delete'+'?authToken='+this.authKeyMe,data);
    return myResponse;

  }
  public editBlog(blogId,blogdata): any {
    let myResponse =this._http.put(this.baseUrl+ '/' + blogId + '/edit' + '?authToken=' + this.authKeyMe,blogdata);
    console.log(myResponse);
    return myResponse;

  }

}
