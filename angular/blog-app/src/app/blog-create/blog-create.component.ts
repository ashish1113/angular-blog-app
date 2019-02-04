import { Component, OnInit ,ViewContainerRef } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';


import { ActivatedRoute, Router } from "@angular/router"

import { Action } from 'rxjs/internal/scheduler/Action';
import { error } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
 



@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  


 

  constructor(private blogHttpService: BlogHttpService ,private _route:ActivatedRoute,private router :Router,private toastr: ToastrService ) { 
    //this.toastr.setRootViewContainerRef(vcr);
  }
  
  public blogTitle:string;
  public blogBodyHtml:string;
  public blogDescription:string;
  public blogCategory:string;
  public possibleCategories = ["comedy","drama","Action","Technology"]

  ngOnInit() {
  }
  public createBlog():any{

    let blogdata = {
      title:this.blogTitle,
      description:this.blogDescription,
      blogBody:this.blogBodyHtml,
      category:this.blogCategory
    }

    console.log(blogdata);
    this.blogHttpService.createBlog(blogdata).subscribe(

      data=>{
        console.log("blog created")
        console.log(data)
        this.toastr.success('Hello world!', 'Toastr fun!');
        
       

        setTimeout(()=>{
          this.router.navigate(['blog',data.data.blogId]);
        },1000)
       /* this.toastr.success('blog posted successfully','Success!');

       

        setTimeout(()=>{
          this.router.navigate(['blog',data.data.blogId]);
        },1000
        )*/

      },
      error=>{
        console.log("some error occurred");
        console.log(error.errorMessage);
        alert('some error occured');
      }
      
      

      
    )


  }
}
