import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { mirapiAnimations } from '@mirapi/animations';
import { MirapiConfirmDialogComponent } from '@mirapi/components/confirm-dialog/confirm-dialog.component';
import { MirapiProgressBarService } from '@mirapi/components/progress-bar/progress-bar.service';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { SaveAnswer } from 'app/main/admin/posts/saveAnswer';
import { LoginModalComponent } from 'app/main/authentication/login-modal/login-modal.component';
import { QuestionDetailService } from 'app/main/questions/question-detail/question-detail.service';
import { QuestionsService } from 'app/main/questions/questions.service';
import { User } from 'app/shared/models/user';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { AuthService } from 'app/shared/services/auth.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IkincielService } from '../ikinciel.service';

@Component({
  selector: 'ikinciel-detay',
  templateUrl: './ikinciel-detay.component.html',
  styleUrls: ['./ikinciel-detay.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : mirapiAnimations
})
export class IkincielDetayComponent implements OnInit {
  
  confirmDialogRef: MatDialogRef<MirapiConfirmDialogComponent>;
  private _unsubscribeAll: Subject<any>;
  post : any
  comments : any[]
  answer : string;
  images: string[];
  profileImage : string;
  isEditable : boolean;
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
    private authService: AuthService,
    private alertifyService : AlertifyService,
    private ikinciElService : IkincielService) {

    this._unsubscribeAll = new Subject();
    this.isLoggedIn =  false;
    this.ikinciElService.onPostChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
     this.post = data;         
  });
   }

  ngOnInit() {


    this.userSub = this.authService.user$.subscribe((user: User) => {
      this.user = user;
      if (this.user) {
        this.isLoggedIn = true;
      }
    
    });
    if (this.user) {
      if (this.user.Id==this.post.user.Id) {
        this.isEditable = true;
      }
      else
      this.isEditable = false;
    }
    
    }
      




  sendAnswer() {


    let request = new SaveAnswer()
    request.title =  ""
    request.parentId = this.post.Id;
    request.message = this.answer;
    request.userId = this.user.Id;
    request.isAnswered = false;

    this.ikinciElService.addAnswer(request).then();
    this.answer = "";
    
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
        this.ikinciElService.deleteAnsver(id).then(data=>{
          this.ikinciElService.getProduct().then(data=>{
 
          });
        });


      
      }
      this.confirmDialogRef = null;
  });

  this.progressBarService.hide();
  }


  async deletePost(data : PostModel){
    
    this.confirmDialogRef = this._matDialog.open(MirapiConfirmDialogComponent, {
      disableClose: false
  });

  this.confirmDialogRef.componentInstance.confirmMessage = 'Bu gönderiyi silmek istediğinizden emin misiniz?';


  this.confirmDialogRef.afterClosed()
  .subscribe(result => {
      if ( result )
      { 
         this.ikinciElService.deleteProduct(data).then(()=>{
        this.router.navigateByUrl("/ikinciel");
      });
      }
      this.confirmDialogRef = null;
  });

    
  }


}
