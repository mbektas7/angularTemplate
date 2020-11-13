import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SaveCarComponent } from './save-car/save-car.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { mirapiAnimations } from '@mirapi/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CarModel } from '../../../shared/models/CarModel';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  animations : mirapiAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CarsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'brand'];
  dataSource: MatTableDataSource<CarModel>;
  cars: CarModel[];
  title = "Araç";

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
    this.adminService.getList('car').then(data=>{
      this.cars = data;
      this.dataSource = new MatTableDataSource(this.cars);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  add(brand){
    this.adminService.addItem('car',brand).then(()=> {
      this.getList();
    });

  }  

  saveDialog(): void {
    const dialogRef = this.dialog.open(SaveCarComponent, {
      width: '500px',
      data: { state: 'new'}

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {    
        const data = {
          name: result.name ,
          brandId : result.brandId};
         this.add(data);
      } 
    });
  }


  updateDialog(id): void {

    const item = this.findById(id, this.cars);
    const dialogRef = this.dialog.open(SaveCarComponent, {
      width: '500px',
      data: { 
        state: 'update',
        id: item.id,
        name: item.name,
        brandId : item.brand.id
      }

    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
      if (result != null&& !result.mode) {    
        this.adminService.updateData('car/',result).then(()=>{
          this.getList();
        });
      }
      if (result && result.mode === 'delete'){
        await this.adminService.deleteData('car/', result.id).then();
        this.getList();
      }
    });
  }


  findById(id: any, array: any[]){
    return array.find(x => x.id === id);
  }

}
