import { Component, OnInit, OnDestroy, ViewContainerRef  } from '@angular/core';
//import route related code
import { ActivatedRoute, Router } from "@angular/router"
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
//import { ToastrService } from 'ngx-toastr';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { from } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  providers:[Location]
})
export class BlogViewComponent implements OnInit, OnDestroy {

  public currentBlog: any;


  constructor(private _route: ActivatedRoute, private router: Router, public blogService: BlogService,public blogHttpService:BlogHttpService,private location:Location, public toastr: ToastrManager) {
    
    //this.toastr.setRootViewContainerRef(vcr);
    console.log(" blog view constructor is called");
  }

  ngOnInit() {

    console.log("blog view oninit is called");
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
      data=>{
        console.log("logging data");
        console.log(data);
        this.currentBlog= data.data;
        this.toastr.successToastr('This is success toast.', 'Success!');
      },
      error =>{
        console.log("some error occurred");
        console.log(error.errorMessage)
      }
      
    )
   
  }

  public deleteThisBlog():any{

    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
      data=>{
        console.log(`blog ${this.currentBlog.blogId} deleteed`)
        console.log(data);
        this.toastr.successToastr('This is success toast.', 'Success!');
        
       // this.toastr.success('Hello world!', 'Toastr fun!');
        setTimeout(()=>{
          this.router.navigate(['/home']);
        },1000)
      },
      error =>{
        console.log("some error occurred");
        console.log(error.errorMessage);
      }
    
    )
    }

    public goBackToPreviousPage(): any{
      this.location.back();
    }

  ngOnDestroy() {
    console.log("blog-view component destroyed")
  }




}
