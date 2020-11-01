import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { PostModel } from '../admin/posts/PostModel';
import { mirapiAnimations } from '@mirapi/animations';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: mirapiAnimations
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
      console.log(this.posts);
    });
  }
  
  add(item){
    this.adminService.addItem('post',item).then(()=> {
      this.getList();
    });

  }  

}
