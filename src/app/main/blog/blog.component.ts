import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { mirapiAnimations } from '@mirapi/animations';
import { AuthService } from 'app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: mirapiAnimations
})
export class BlogComponent implements OnInit {

  posts: any;
  isLoggedIn : boolean ;
  searchText : "string";
  user: User;
  userSub: Subscription;
  constructor(
    private adminService : AdminService,
    private authService : AuthService
  ) {

    this.authService.getCurrentUser().subscribe();   
   }

  ngOnInit() {


   
    this.userSub = this.authService.user$.subscribe((user: User) => {
      this.user = user;
    if (this.user) {
      this.isLoggedIn = true;
    }
    
    });
    this.getList();
  }

  getList(){
    this.adminService.getList('blog').then(data=>{
      this.posts = data;
    
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
