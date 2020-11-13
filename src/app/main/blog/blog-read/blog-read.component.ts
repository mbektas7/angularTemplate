import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { mirapiAnimations } from '@mirapi/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { request } from 'http';
import { AuthService } from 'app/shared/services/auth.service';
import { SaveAnswer } from 'app/main/admin/posts/saveAnswer';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { Router } from '@angular/router';

import 'moment/locale/tr';
import { BlogService } from '../blog.service';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'app-blog-read',
  templateUrl: './blog-read.component.html',
  styleUrls: ['./blog-read.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: mirapiAnimations
})
export class BlogReadComponent implements OnInit {

  
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
    private blogService : BlogService,
    private router : Router,
    private authService: AuthService,
    private httpReq : HttpRequestsService) {

    this._unsubscribeAll = new Subject();
   }

  ngOnInit() {
    this.isLoggedIn =  false;


   this.userSub = this.authService.user$.subscribe((user: User) => {
    this.user = user;
    if (this.user) {
      this.isLoggedIn = true;
    }
  
  });
     this.blogService.onPostChanged
       .pipe(takeUntil(this._unsubscribeAll))
       .subscribe(data => {
        this.post = data;
        this.likeList = this.post.likes;
        this.likeCount = this.post.likes.length;
        this.isLiked();
     });
     this.getPostImages();
    // this.profileImage = this.autService.userProfileImage;


     if (this.user.Id.toString()==this.post.user.Id) {
       this.isEditable = true;
     }
     else
     this.isEditable = false;
  }

  getPostImages(){
    this.blogService.getPostImages().then(data=>{
        this.images = data;
    });
  }

  isLiked(){
    this.liked = false;
    for (let index = 0; index < this.likeList.length; index++) {

      const item = this.likeList[index];
      if (item.user.Id==this.user.Id.toString()) {
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

    this.blogService.addAnswer(request).then();
    this.answer = "";
    
  }



  vote(vote : number){
    let data = {
      'vote': vote,
      'postId' : this.post.Id,
      'userId': this.user.Id.toString()
    }
    this.httpReq.addItem("blog/vote",data).then(()=>{
      this.blogService.getPost();
      
    });
  }

  like(like: boolean){

    let data = {
      'Id' : this.post.Id,
      'userId' :this.user.Id.toString()
    }

    if (!like) {
      this.httpReq.addItem("blog/like",data).then(()=>{
        this.blogService.getPost();
        this.isLiked();
      });
    } else {
      this.httpReq.addItem("blog/unlike",data).then(()=>{
        this.blogService.getPost();
        this.isLiked();
      });
    }
  
    
  }



  // async deletePost(data : PostModel){
  //   await this.questionService.deletePost(data).then(()=>{
  //     this.router.navigateByUrl("/questions");
  //   });
  // }

  







}
