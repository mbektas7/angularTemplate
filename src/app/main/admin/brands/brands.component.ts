import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveBrandComponent } from './save-brand/save-brand.component';
import { AdminService } from '../admin.service';
import { BrandModel } from './BrandModel';
import { mirapiAnimations } from '@mirapi/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  animations : mirapiAnimations,
  encapsulation: ViewEncapsulation.None
})
export class BrandsComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<BrandModel>;
  brands: BrandModel[];


  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  
  constructor(
    public dialog: MatDialog,
    private adminService : AdminService
  ) { }

  ngOnInit() {
    this.getBrandList();
  }

  

  getBrandList(){
    this.adminService.getList('brand').then(data=>{
      this.brands = data;
      this.dataSource = new MatTableDataSource(this.brands);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  addBrand(brand){
    this.adminService.addItem('brand',brand).then(()=> {
      this.getBrandList();
    });

  }  

  saveDialog(): void {
    const dialogRef = this.dialog.open(SaveBrandComponent, {
      width: '500px',
      data: { state: 'new'}

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {    
        const data = {name: result.name};
         this.addBrand(data);
      } 
    });
  }


  updateDialog(id): void {

    const item = this.findById(id, this.brands);
    const dialogRef = this.dialog.open(SaveBrandComponent, {
      width: '500px',
      data: { 
        state: 'update',
        id: item.id,
        name: item.name
      }

    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
      if (result != null&& !result.mode) {    
        this.adminService.updateData('brand/',result).then(()=>{
          this.getBrandList();
        });
      }
      if (result && result.mode === 'delete'){
        await this.adminService.deleteData('brand/', result.id).then();
        this.getBrandList();
      }
    });
  }


  findById(id: any, array: any[]){
    return array.find(x => x.id === id);
  }


}
