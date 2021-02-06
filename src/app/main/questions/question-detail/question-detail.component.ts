import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { mirapiAnimations } from '@mirapi/animations';
import { QuestionsService } from '../questions.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { QuestionDetailService } from './question-detail.service';
import { request } from 'http';
import { AuthService } from 'app/shared/services/auth.service';
import { SaveAnswer } from 'app/main/admin/posts/saveAnswer';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { Router } from '@angular/router';

import 'moment/locale/tr';
import { User } from 'app/shared/models/user';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginDTO } from 'app/shared/models/LoginDTO';
import { LoginModalComponent } from 'app/main/authentication/login-modal/login-modal.component';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { MirapiProgressBarService } from '@mirapi/components/progress-bar/progress-bar.service';
import { MirapiConfirmDialogComponent } from '@mirapi/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: mirapiAnimations
})
export class QuestionDetailComponent implements OnInit {
  confirmDialogRef: MatDialogRef<MirapiConfirmDialogComponent>;
  private _unsubscribeAll: Subject<any>;
  post : any
  comments : any[]
  answer : string;
  images: string[];
  profileImage : string;
  isEditable : boolean;
  likeCount : string;
  likeList : any[];
  liked : boolean;
  moment: any = moment;
  isLoggedIn : boolean;
  user: User;
  userSub: Subscription;
  constructor(
    public _matDialog: MatDialog,
    private questionService : QuestionsService,
    private progressBarService : MirapiProgressBarService,
    private router : Router,
    public dialog: MatDialog,
    private questionDeatilService : QuestionDetailService,
    private authService: AuthService,
    private alertifyService : AlertifyService,
    private httpReq : HttpRequestsService) {

    this._unsubscribeAll = new Subject();
    this.isLoggedIn =  false;
    
   }

  ngOnInit() {
   

     this.questionDeatilService.onPostChanged
       .pipe(takeUntil(this._unsubscribeAll))
       .subscribe(data => {
        this.post = data;
        this.likeList = this.post.likes;
        this.likeCount = this.post.likes.length;
       
     });

     this.getPostImages();

     this.userSub = this.authService.user$.subscribe((user: User) => {
      this.user = user;
      if (this.user) {
        this.isLiked();
         this.isLoggedIn = true;
         this.profileImage = this.user.photo.path;
         if (this.user.Id==this.post.user.Id) {
          this.isEditable = true;
        }
      }
        else{
        this.isEditable = false;
     }
      });
   
    }
      


   

  getPostImages(){
    this.questionDeatilService.getPostImages().then(data=>{
        this.images = data;
    });
  }

  isLiked(){
    this.liked = false;
    for (let index = 0; index < this.likeList.length; index++) {

      const item = this.likeList[index];
      if (item.user.Id==this.user.Id) {
        this.liked = true;
        console.log("begenmiş");
        break;
       } else {
        this.liked = false;
       }
    }
  }

  sendAnswer() {
  console.log(this.user.Id);
    let request = new SaveAnswer()
    request.title =  ""
    request.parentId = this.post.Id;
    request.message = this.answer;
    request.userId = this.user.Id;
    request.carId = this.post.car.Id;
    request.isAnswered = false;

    this.questionDeatilService.addAnswer(request).then();
    this.answer = "";
    
  }



  vote(vote : number){
    let data = {
      'vote': vote,
      'postId' : this.post.Id,
      'userId': this.user.Id.toString()
    }
    this.httpReq.addItem("post/vote",data).then(()=>{
      this.questionDeatilService.getPost();
      
    });
  }

  like(like: boolean){

    let data = {
      'Id' : this.post.Id,
      'userId' : this.user.Id.toString()
    }

    if (!like) {
      this.httpReq.addItem("post/like",data).then(()=>{
        this.questionDeatilService.getPost().then(data=>{
          this.isLiked();
        });
        
      });
    } else {
      this.httpReq.addItem("post/unlike",data).then(()=>{
        this.questionDeatilService.getPost().then(a=>{
          this.isLiked();
        });
        
      });
    }
  
    
  }



  async deletePost(data : PostModel){
    await this.questionService.deletePost(data).then(()=>{
      this.router.navigateByUrl("/questions");
    });
  }

  


  
  login(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px',
      data: { }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { 
       console.log(result);
       this.authService.loginWithModal(result).subscribe(() => {
        this.alertifyService.success('Giriş yapıldı.');
        this.authService.getCurrentUser().subscribe();
      }, err => {
        this.alertifyService.error('Giriş sırasında hata oluştu. Bilgilerinizi kontrol ediniz.');
      });
    } else {
       
    }
      } 
    );
  }



  async commentDelete(id: string){
    this.progressBarService.show();
    this.confirmDialogRef = this._matDialog.open(MirapiConfirmDialogComponent, {
      disableClose: false
  });

  this.confirmDialogRef.componentInstance.confirmMessage = 'Yorumunuzu silmek için emin misiniz?';


  this.confirmDialogRef.afterClosed()
  .subscribe(result => {
      if ( result )
      {
        this.questionDeatilService.deleteAnsver(id).then(data=>{
          this.questionDeatilService.getPost().then(data=>{
 
          });
        });


      
      }
      this.confirmDialogRef = null;
  });

  this.progressBarService.hide();
  }



}
