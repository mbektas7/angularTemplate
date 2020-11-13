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

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: mirapiAnimations
})
export class QuestionDetailComponent implements OnInit {

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
    private questionService : QuestionsService,
    private router : Router,
    private questionDeatilService : QuestionDetailService,
    private authService: AuthService,
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
        this.isLiked();
     });

     this.getPostImages();

     this.userSub = this.authService.user$.subscribe((user: User) => {
      this.user = user;
      if (this.user) {
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
        break;
       } else {
        this.liked = false;
       }
    }
  }

  sendAnswer() {

    let request = new SaveAnswer()
    request.title =  ""
    request.parentId = this.post.Id;
    request.message = this.answer;
    request.userId = this.user.Id.toString();
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
        this.questionDeatilService.getPost();
        this.isLiked();
      });
    } else {
      this.httpReq.addItem("post/unlike",data).then(()=>{
        this.questionDeatilService.getPost();
        this.isLiked();
      });
    }
  
    
  }



  async deletePost(data : PostModel){
    await this.questionService.deletePost(data).then(()=>{
      this.router.navigateByUrl("/questions");
    });
  }

  







}
