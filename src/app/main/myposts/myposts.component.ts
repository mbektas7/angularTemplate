import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions/questions.service';
import { PostModel } from '../admin/posts/PostModel';
import { MypostDetailComponent } from './mypost-detail/mypost-detail.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MirapiConfirmDialogComponent } from '@mirapi/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MypostsComponent implements OnInit {

  confirmDialogRef: MatDialogRef<MirapiConfirmDialogComponent>;
  myPosts : PostModel[];
  myAnswer : PostModel[];
  isEditing = false;
  constructor(
    public _matDialog: MatDialog,
    private questionService : QuestionsService,
    private httpService : HttpRequestsService,
    public dialog: MatDialog,
    private router:Router) { }

  ngOnInit() {

this.getMyPosts();
  }


  async getMyPosts(){
    await this.questionService.getUserPosts().then(data=>{
      this.myAnswer = data.filter(x=>x['parent'] != null);
      console.log(this.myAnswer);
      this.myPosts = data.filter(x=>x['parent'] == null);
      console.log(this.myPosts);
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
      console.log(result);
      if (result != null&& !result.mode) {    
      await  this.questionService.updatePost(result).then(()=>{
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

  show(data : PostModel){
   
   
    this.httpService.getById("post/",data.Id).subscribe(a=>{
    
      this.router.navigateByUrl('/questions/'+a["data"]["parent"]["Id"]);
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
