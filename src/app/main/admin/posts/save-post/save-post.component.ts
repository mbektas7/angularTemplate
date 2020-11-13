import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostModel } from '../PostModel';
import { mirapiAnimations } from '@mirapi/animations';
import { AdminService } from '../../admin.service';
import { CarModel } from '../../../../shared/models/CarModel';

@Component({
  selector: 'app-save-post',
  templateUrl: './save-post.component.html',
  styleUrls: ['./save-post.component.scss'],
  animations : mirapiAnimations,
  encapsulation: ViewEncapsulation.None
})
export class SavePostComponent implements OnInit {

  post = new PostModel;
  title = "";
  message = "";
  cars : CarModel[]

  
  constructor(

    private adminService : AdminService
  ) { }

  ngOnInit() {
    this.getCarList();
  }

  getCarList(){
    this.adminService.getList('car').then(data=>{
      this.cars = data;
    });
  }


  addPost(){
    this.adminService.addItem('post',this.post).then( data => {
      console.log(data);
    });
    
  }
  

}
