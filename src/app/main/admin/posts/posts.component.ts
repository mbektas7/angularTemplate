import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PostModel } from './PostModel';
import { AdminService } from '../admin.service';
import { mirapiAnimations } from '@mirapi/animations';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations : mirapiAnimations,
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'car', 'user'];
  dataSource: MatTableDataSource<PostModel>;
  posts: PostModel[];
  title = "Gönderiler";

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  
  constructor(
    public dialog: MatDialog,
    private adminService : AdminService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.adminService.getList('post').then(data=>{
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  add(item){
    this.adminService.addItem('post',item).then(()=> {
      this.getList();
    });

  }  
  findById(id: any, array: any[]){
    return array.find(x => x.id === id);
  }
}
