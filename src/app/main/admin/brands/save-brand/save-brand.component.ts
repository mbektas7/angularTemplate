import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpRequestsService } from 'app/shared/services/httpRequests.service';


export interface  dialogData {
  
  id: string;
  name: string;
  
}

@Component({
  selector: 'app-save-brand',
  templateUrl: './save-brand.component.html',
  styleUrls: ['./save-brand.component.scss']
})
export class SaveBrandComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SaveBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
    private httpService: HttpRequestsService
  ) { }


  ngOnInit() {
    console.log(this.data);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }


}
