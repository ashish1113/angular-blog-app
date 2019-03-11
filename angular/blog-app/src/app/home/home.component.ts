import { Component, OnInit,OnDestroy } from '@angular/core';
//import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit ,OnDestroy {

  public allBlogs;


  constructor(public blogHttpService:BlogHttpService) {
    console.log("home component is called");
   }

  ngOnInit() {
    console.log("home component onimit is called");
    //this .allBlogs =this.blogHttpService.getAllBlogs();
    //console.log(this.allBlogs);
    this.allBlogs = this.blogHttpService.getAllBlogs().subscribe(
      data=>{
        console.log("logging data");
        console.log(data);
        this.allBlogs= data["data"];
      },
      error =>{
        console.log("some error occurred");
        console.log(error.errorMessage)
      }
      
    )

  }

  ngOnDestroy() {
    console.log("home component ondestroy is called");

  }

}
