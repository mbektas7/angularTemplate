import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { PostModel } from '../admin/posts/PostModel';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})


export class QuestionsComponent implements OnInit {
  posts: any;

  constructor(
    private adminService : AdminService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.adminService.getList('post').then(data=>{
      this.posts = data;
    });
  }
  
  add(item){
    this.adminService.addItem('post',item).then(()=> {
      this.getList();
    });

  }  

}
