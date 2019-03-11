import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
//import {Location} from '@angular/common';

//import { ToastrService } from 'ngx-toastr';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  public currentBlog: any;
  public possibleCategories = ["comedy","drama","Action","Technology"];

  constructor(private _route: ActivatedRoute, private router: Router, public blogService: BlogService,public blogHttpService:BlogHttpService,public toastr: ToastrManager ) {
    
    //this.toastr.setRootViewContainerRef(vcr);

    console.log(" blog edit constructor is called");
  }

  ngOnInit() {

    console.log("blog edit oninit is called");
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

  public editThisBlog():any{

    this.blogHttpService. editBlog(this.currentBlog.blogId,  this.currentBlog).subscribe(
      data=>{
       // console.log(`blog ${this.currentBlog.blogId} loaded to edit`)
        console.log(data);
        //this.toastr.success('Hello world!', 'Toastr fun!');
        this.toastr.successToastr('This is success toast.', 'Success!');

        setTimeout(()=>{
          this.router.navigate(['/blog',this.currentBlog.blogId]);
        },1000)
      },
      error =>{

        console.log("some error occurred");
        console.log(error.errorMessage);
      }
    
    )
    }

}
