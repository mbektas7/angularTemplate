import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { mirapiAnimations } from '@mirapi/animations';
import { QuestionsService } from '../questions.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
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
  constructor(
    private questionService : QuestionsService,
    private router : Router,
    private questionDeatilService : QuestionDetailService,
    private autService: AuthService,
    private httpReq : HttpRequestsService) {

    this._unsubscribeAll = new Subject();
    this.isLoggedIn =  false;
    this.isLoggedIn = this.autService.isTokenValid();
    console.log("questions-detail");
    console.log(this.autService.isTokenValid());
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
     this.profileImage = this.autService.userProfileImage;


     if (this.autService.getCurrentUserId()==this.post.user.Id) {
       this.isEditable = true;
     }
     else
     this.isEditable = false;
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
      if (item.user.Id==this.autService.getCurrentUserId()) {
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
    request.userId = this.autService.getCurrentUserId();
    request.carId = this.post.car.Id;
    request.isAnswered = false;

    this.questionDeatilService.addAnswer(request).then();
    this.answer = "";
    
  }



  vote(vote : number){
    let data = {
      'vote': vote,
      'postId' : this.post.Id,
      'userId': this.autService.getCurrentUserId()
    }
    this.httpReq.addItem("post/vote",data).then(()=>{
      this.questionDeatilService.getPost();
      
    });
  }

  like(like: boolean){

    let data = {
      'Id' : this.post.Id,
      'userId' : this.autService.getCurrentUserId()
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
