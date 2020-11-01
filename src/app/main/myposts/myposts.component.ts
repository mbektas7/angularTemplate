import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions/questions.service';
import { PostModel } from '../admin/posts/PostModel';
import { MypostDetailComponent } from './mypost-detail/mypost-detail.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MypostsComponent implements OnInit {

  myPosts : PostModel[];
  isEditing = false;
  constructor(
    private questionService : QuestionsService,
    public dialog: MatDialog,) { }

  ngOnInit() {

this.getMyPosts();
  }


  async getMyPosts(){
    await this.questionService.getUserPosts().then(data=>{
      this.myPosts = data;
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

  async deletePost(data : PostModel){
    await this.questionService.deletePost(data).then(()=>{
      this.getMyPosts();
    });
  }


  findById(id: any, array: any[]){
    return array.find(x => x.Id === id);
  }



}
