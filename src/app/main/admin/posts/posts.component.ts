import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PostModel } from './PostModel';
import { AdminService } from '../admin.service';
import { mirapiAnimations } from '@mirapi/animations';
import { SavePostComponent } from './save-post/save-post.component';

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


  updateDialog(id): void {

    const item = this.findById(id, this.posts);
    const dialogRef = this.dialog.open(SavePostComponent, {
      width: '500px',
      data: { 
        state: 'update',
        id: item.Id,
        name: item.message,
        carId : item.car.Id
      }

    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
      if (result != null&& !result.mode) {    
        this.adminService.updateData('post/',result).then(()=>{
          this.getList();
        });
      }
      if (result && result.mode === 'delete'){
        await this.adminService.deleteData('post/', result.id).then();
        this.getList();
      }
    });
  }



  findById(id: any, array: any[]){
    return array.find(x => x.id === id);
  }
}
