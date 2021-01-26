import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MirapiConfirmDialogComponent } from '@mirapi/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { QuestionsService } from 'app/main/questions/questions.service';
import { MypostDetailComponent } from 'app/main/myposts/mypost-detail/mypost-detail.component';
import { ProfileDetailService } from '../../profil-detail.service';
import { AuthService } from 'app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'app/shared/models/user';




@Component({
  selector: 'app-cevaplarim',
  templateUrl: './cevaplarim.component.html',
  styleUrls: ['./cevaplarim.component.scss']
})
export class CevaplarimComponent implements OnInit {
  userLoggedIn : User;
  userSub: Subscription;
  confirmDialogRef: MatDialogRef<MirapiConfirmDialogComponent>;
  myPosts : PostModel[];
  myAnswer : PostModel[];
  isEditing = false;
  constructor(public _matDialog: MatDialog,
    private profileService : ProfileDetailService,
    private questionService : QuestionsService,
    private httpService : HttpRequestsService,
    private authService : AuthService,
    public dialog: MatDialog,
    private router:Router) {

      this.myAnswer = [];

     }


  ngOnInit() {

    this.getMyPosts();
    this.userSub = this.authService.user$.subscribe((user: User) => {
      this.userLoggedIn = user;
     
    });
      }
    
    
      async getMyPosts(){
        await this.profileService.getUserQuestions().then(data=>{
          this.myAnswer = data.filter(x=>x['parent'] != null);
         
        });
      }

      show(data : PostModel){
   
   
        this.httpService.getById("post/",data.Id).subscribe(a=>{
        
          this.router.navigateByUrl('/questions/'+a["data"]["parent"]["Id"]);
        });
    
       
      }



      updateDialog(id): void {

        const item = this.findById(id, this.myPosts);
        const dialogRef = this.dialog.open(MypostDetailComponent, {
          width: '500px',
          data: { 
            state: 'update',
            Id: item.Id,
            title: item.title,
            message : item.message
          }
    
        });
    
        dialogRef.afterClosed().subscribe(async result => {
         
          if (result != null&& !result.mode) {    
          await  this.profileService.updatePost(result).then(()=>{
              this.getMyPosts();
            });
           
          }
          if (result && result.mode === 'delete'){
            await this.questionService.deletePost(result).then(()=>{
              this.getMyPosts();
            });
          
          }
    
        });
    
         
      }
        
          async deletePost(data : PostModel){
        
            this.confirmDialogRef = this._matDialog.open(MirapiConfirmDialogComponent, {
              disableClose: false
          });
        
          this.confirmDialogRef.componentInstance.confirmMessage = 'Bu gönderiyi silmek için emin misiniz?';
        
        
          this.confirmDialogRef.afterClosed()
          .subscribe(result => {
              if ( result )
              {
                 this.questionService.deletePost(data).then(()=>{
                  this.getMyPosts();
                });
              }
              this.confirmDialogRef = null;
          });
        
            
          }
        
        
          findById(id: any, array: any[]){
            return array.find(x => x.Id === id);
          }
        
    }
