import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandModel } from '../../brands/BrandModel';
import { AdminService } from '../../admin.service';


export interface  dialogData {
  
  id: string;
  name: string;
  brandId : string;
}

@Component({
  selector: 'app-save-car',
  templateUrl: './save-car.component.html',
  styleUrls: ['./save-car.component.scss']
})
export class SaveCarComponent implements OnInit {


  title = "Araç";
  brands : BrandModel[];
  constructor(
    public dialogRef: MatDialogRef<SaveCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
    private adminService : AdminService
  ) {

    this.getBrandList();

   }


  ngOnInit() {
    
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  getBrandList(){
    this.adminService.getList('brand').then(data=>{
      this.brands = data;
    });
  }

  delete(data){
    data.mode = 'delete';
    this.dialogRef.close(data);
}

}
