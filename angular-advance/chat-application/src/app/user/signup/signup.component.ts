import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apiKey: any;

  constructor(
    public appService: AppService,
    public router: Router,
    public toastr: ToastrManager) { }

  ngOnInit() {
  }
  public goToSignIn: any = () => {

    this.router.navigate(['/']);
  }

  public signupFunction: any = () => {

    console.log("|||------------" +this+"--------------|||");

    if (!this.firstName) {

      this.toastr.warningToastr('enter firstname');


    }

    else if (!this.lastName) {

      this.toastr.warningToastr('enter lastname');


    }
    else if (!this.mobile) {

      this.toastr.warningToastr('enter mobile');


    }
    else if (!this.email) {

      this.toastr.warningToastr('enter email');


    }
    else if (!this.password) {

      this.toastr.warningToastr('enter password');


    }
    else if (!this.apiKey) {

      this.toastr.warningToastr('enter api key');


    }
    else {
      let data = {

        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      }

      console .log (data);
      this.appService.signupFuntion(data)
        .subscribe((apiResponse) => {
          console.log(apiResponse);
          if (apiResponse.status === 200) {
            this.toastr.successToastr('This is success toast.', 'Success!');
            setTimeout(()=> {
              this.goToSignIn();
            },2000);

          } else  {
            this .toastr.errorToastr(apiResponse.message);
          }
        },
        (err) => {
          this .toastr.errorToastr('some error occurred')
        });
        }
       
    }

  }


