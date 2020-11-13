import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { BrandModel } from '../../brands/BrandModel';
import { CarModel } from '../../../../shared/models/CarModel';

export interface  dialogData {
  
  brandId: string;
  carId: string;
}

@Component({
  selector: 'app-select-car',
  templateUrl: './select-car.component.html',
  styleUrls: ['./select-car.component.scss']
})
export class SelectCarComponent implements OnInit {

  brands : BrandModel[];
  cars : CarModel[];
  constructor(
    public dialogRef: MatDialogRef<SelectCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
    private adminService : AdminService
  ) { 

    this.cars = [];
    this.brands = [];
  }

  ngOnInit() {
    this.getBrandList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  getBrandList(){
    this.adminService.getList('brand').then(data=>{
      this.brands = data;
    });
  }


  getCarsList(deviceValue) {
     this.cars = null;
      this.adminService.getList('car/getByBrandId/'+deviceValue).then(data=>{
        console.log(data);
        this.cars= data;
      });
   
}



}
