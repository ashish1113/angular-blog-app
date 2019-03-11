import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
//routing
import { RouterModule,Routes}from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import {LoginComponent} from './user/login/login.component';
import {SignupComponent} from './user/signup/signup.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChatModule,
    UserModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'sign-up',component:SignupComponent,pathMatch: 'full'},
      {path:'login',component:LoginComponent,pathMatch: 'full'},
      {path:'',redirectTo:'login',pathMatch: 'full'},
      {path:'*',component:LoginComponent},
      {path:'**',component:LoginComponent}
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
