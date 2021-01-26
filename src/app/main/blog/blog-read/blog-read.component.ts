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
  selector: 'blog-read',
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
    private authService: AuthService) {

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
     
     });
     this.getPostImages();
    // this.profileImage = this.autService.userProfileImage;


    if (this.user) {
      if (this.user.Id==this.post.user.Id) {
        this.isEditable = true;
      }
      else
      this.isEditable = false;
    }
    
  }

  getPostImages(){
    this.blogService.getPostImages().then(data=>{
        this.images = data;
    });
  }








}
