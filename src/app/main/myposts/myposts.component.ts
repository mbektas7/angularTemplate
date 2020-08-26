import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions/questions.service';
import { PostModel } from '../admin/posts/PostModel';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MypostsComponent implements OnInit {

  myPosts : PostModel[];
  constructor(private questionService : QuestionsService) { }

  ngOnInit() {

this.getMyPosts();
  }


  getMyPosts(){
    this.questionService.getUserPosts().then(data=>{
      this.myPosts = data;
      console.log(this.myPosts);
    });
  }

  delete(){
    console.log("sil");
  }

  edit(){
    console.log("delete");
  }



}
