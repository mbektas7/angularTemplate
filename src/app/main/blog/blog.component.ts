import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { mirapiAnimations } from '@mirapi/animations';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: mirapiAnimations
})
export class BlogComponent implements OnInit {

  posts: any;
  isLoggedIn : boolean ;
  searchText : "string";
  constructor(
    private adminService : AdminService,
    private authService : AuthService
  ) {


      if (this.authService.getRefreshToken()!=""){
         
         
          this.isLoggedIn = true;
         
  }
  else {
      this.isLoggedIn = false;
  }

   
   }

  ngOnInit() {
   
    this.getList();
  }

  getList(){
    this.adminService.getList('blog').then(data=>{
      this.posts = data;
      console.log(this.posts);
    });
  }
  
  add(item){
    this.adminService.addItem('blog',item).then(()=> {
      this.getList();
    });

  }  

  search(){
    this.adminService.getList('blog/filter/'+this.searchText).then(data=> {
      this.posts = data;
    });
  }

}
