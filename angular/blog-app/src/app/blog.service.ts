import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public currentBlog: any;
  public allBlogs = [
    {
      "blogId": "1",
      "lastModified": "2017-10-20T12:20:47.854Z",
      "created": "2017-10-20T12:20:47.854Z",
      "tags": [],
      "author": "Admin",
      "category": "comedy",
      "isPublished": true,
      "views": 0,
      "bodeHtml": "hi this is blog body",
      "description": "this is blog 1 description",
      "title": "this is blog 1"

    },
    {
      "blogId": "2",
      "lastModified": "2017-10-21T21:47:51.678Z",
      "created": "2017-10-21T21:47:51.678Z",
      "tags": [],
      "author": "Admin",
      "category": "comedy",
      "isPublished": true,
      "views": 0,
      "bodeHtml": "<h1>hi this is big text blog body</h1> <p> Small Text</p>",
      "description": "this is blog 1 description of id 2",
      "title": "this is blog example"

    },
    {
      "blogId": "3",
      "lastModified": "2017-11-14T14:15:54.407Z",
      "created": "2017-11-14T14:15:54.407Z",
      "tags": [],
      "author": "Admin",
      "category": "comedy",
      "isPublished": true,
      "views": 0,
      "bodeHtml": "hi this is blog body,hi this is blog body,hi this is blog body",
      "description": "this is blog 1 description",
      "title": "this is blog 3"

    }
  ]
  

  constructor() {
    console.log("service constructor is called");
  }


  public getAllBlogs(): any {
    return this.allBlogs;
  }
  public getSingleBlogInformation(currentBlogId: any): any {


    for (let blog of this.allBlogs) {
      if (blog.blogId == currentBlogId) {
        this.currentBlog = blog;
      }
    }

    console.log(this.currentBlog);
    return this.currentBlog;
  }
}
