import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { AppService } from './../../app.service';
import {SocketService} from './../../socket.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
//import { timingSafeEqual } from 'crypto';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers:[SocketService]
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('scrollMe',{read:ElementRef})

  public scrollMe :ElementRef;
  
  
  public authToken:any;
  public userInfo :any;
  public userList:any=[];
  public disconnectedSocket:boolean;

  public scrollTOChatTop:boolean=false;

  public receiverId:any;
  public receiverName:any;
  public previousChatList:any=[];
  public messageText:any;
  public messageList:any =[];
  public pageValue:number=1;
  public loadingPreviousChat:boolean=false;

  constructor(
    public appService: AppService,
    public router: Router,
    public toastr: ToastrManager,
    public SocketService:SocketService
    ){}
  
  ngOnInit() {

    this.authToken= Cookie.get('authtoken');
    this.userInfo= this.appService.getUserInfoFromLocalStorage();
    this.receiverId = Cookie.get('receiverId');
    this.receiverName = Cookie.get('receiverName');
    console.log(this.userInfo);
    console.log(this.receiverId,this.receiverName);
    if (this.receiverId!=null&& this.receiverId!=undefined && this.receiverId !=''){
      this.userSelectedToChat(this.receiverId,this.receiverName)
    }
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
    this.getMessageFromAUser()
  }

  public checkStatus:any = () => {
    if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null){
      this.router.navigate(['/']);
      return false;

    } else{
      return true;
    }
  }

  public verifyUserConfirmation:any = ()=>
  {
    this.SocketService.verifyUser().subscribe((data) =>{
      this.disconnectedSocket =false;
      this.SocketService.setUser(this.authToken);
      this.getOnlineUserList()

    });
  }
 
  public getOnlineUserList:any = () =>

 {
   this.SocketService.onlineUserList().subscribe((userlist) =>{
     this.userList=[];
     for (let x in userlist)
     { 
       console.log(userlist+"*************");
       let temp ={'userId':x,'name':userlist[x],'unread':0,'chatting':false};
       this.userList.push(temp);
       console.log(x);
     }
     console.log(this.userList +',');
   });
 }

 public getPreviousChatWithAUser:any=()=>{
   let previousData = (this.messageList.length >0?this.messageList.slice():[])
    console.log(previousData+"getprevious called")
   this .SocketService.getChat(this.userInfo.userId,this.receiverId,this.pageValue*10).subscribe((apiResponse)=>{
     console.log(apiResponse);
     

     if (apiResponse.status ==200)
     {
       this.messageList=apiResponse.data.concat(previousData);
     }else {
       this.messageList=previousData;
       //tostar lagana hai alert hatana hai
       alert('no message found')

     }
     this.loadingPreviousChat=false;
   },(err)=>{
     //tostar lagana hai alert hatana hai
     alert('some error occued');
   });
 }

 public loadEarlierPageOfChat:any=()=>{
   this.loadingPreviousChat =true;
   this .pageValue++;
   this.scrollTOChatTop=true;

   this.getPreviousChatWithAUser()
 }

 public userSelectedToChat:any=(id,name)=>{
   console.log("setting user as active")
   this.userList.map((user)=>{
     if(user.userId==id){
       user.chatting=true;
     }else {
       user.chatting=false;
     }
   });
   Cookie.set('receiverId',id);
   Cookie.set('receiverName',name);
   this.receiverName=name;
   this.receiverId =id;
   this.messageList=[];
   this.pageValue=0;
   let chatDetails ={
     userId:this.userInfo.userId,
     senderId:id
   }
   this.SocketService.markChatAsSeen(chatDetails);

   this.getPreviousChatWithAUser();
 }

    public sendMessageUsingKeypress: any = (event:any) =>
    {
      if (event.keyCode ===13){
        this.sendMessage();
      }
    }


    public sendMessage:any =() =>{
      if (this.messageText){
        let chatMsgObject = {
          senderName:this.userInfo.firstName+""+this.userInfo.lastName,
          senderId:this.userInfo.userId,
          receiverName:Cookie.get('receiverName'),
          receiverId:Cookie.get('receierId'),
          message:this.messageText,
          createdOn :new Date()
        }
        console.log(chatMsgObject);
        this.SocketService.SendChatMessage(chatMsgObject);
        this.pushToChatWindow(chatMsgObject);
      } else {
        //tostar lagana hai alert hatana hai
     alert('text message cannot be empty');
      }
    }

    public pushToChatWindow:any =(data)=>
    {
      this.messageText="";
      this.messageList.push(data)
      this.scrollTOChatTop=false;
    }
    
    public getMessageFromAUser:any =()=>
    {
      this.SocketService.chatByUserId(this.userInfo.userId).subscribe((data)=>{
        (this.receiverId==data.senderId)?this.messageList.push(data):'';
         //tostar lagana hai alert hatana hai
     alert(`${data.senderName}says:${data.message}`);
     this.scrollTOChatTop=false;
    
      });

     
    }

    public logout:any=()=>{
      this.appService.logout().subscribe((apiResponse)=>{

        if (apiResponse.status===200)
        {
          console.log("loout called");
          Cookie.delete('authToken');
          Cookie.delete('receiverId');
          Cookie.delete('receiverName');
          this.SocketService.exitSocket();
          this.router.navigate(['/']);

        } else{
          //tostar lagana hai alert hatana hai
     alert('this.toast some error message');
        }
      },(err)=>{
         //tostar lagana hai alert hatana hai
     alert('this.toast some error message inn errpart');
      });
    }




}
