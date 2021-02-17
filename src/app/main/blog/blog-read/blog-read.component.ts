import { Component, OnInit, SecurityContext, ViewEncapsulation } from '@angular/core';
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
import { MatDialog, MatDialogRef } from '@angular/material';
import { MirapiConfirmDialogComponent } from '@mirapi/components/confirm-dialog/confirm-dialog.component';

import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


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
  confirmDialogRef: MatDialogRef<MirapiConfirmDialogComponent>;

  content : SafeHtml;
  logOutputHtml ="";


  constructor(
    public _matDialog: MatDialog,
    private blogService : BlogService,
    private authService: AuthService,
    private router:Router,
    private sanitized: DomSanitizer
    ) {
   
    this._unsubscribeAll = new Subject();
    this.blogService.onPostChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
     this.post = data;
     this.logOutputHtml += data.message;
     this.content = this.sanitized.bypassSecurityTrustHtml( this.logOutputHtml );


  });
   }

  ngOnInit() {
    this.isLoggedIn =  false;


   this.userSub = this.authService.user$.subscribe((user: User) => {
    this.user = user;
    if (this.user) {
      this.isLoggedIn = true;
    }
  
  });
   
     this.getPostImages();

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

  getHTML(message :string){
    let text = message
    
            return this.sanitized.bypassSecurityTrustHtml(text);
    }


  async deleteBlog(data : PostModel){
    
    this.confirmDialogRef = this._matDialog.open(MirapiConfirmDialogComponent, {
      disableClose: false
  });

  this.confirmDialogRef.componentInstance.confirmMessage = 'Bu gönderiyi silmek istediğinizden emin misiniz?';


  this.confirmDialogRef.afterClosed()
  .subscribe(result => {
      if ( result )
      {
         this.blogService.deleteBlog(data).then(()=>{
          this.router.navigate(['blog']);
        });
      }
      this.confirmDialogRef = null;
  });

    
  }






}
