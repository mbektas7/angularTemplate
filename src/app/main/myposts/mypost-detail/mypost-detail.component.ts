import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



export interface  dialogData {
  
  Id: string;
  message: string;
  title : string;
  state : string;
}


@Component({
  selector: 'app-mypost-detail',
  templateUrl: './mypost-detail.component.html',
  styleUrls: ['./mypost-detail.component.scss']
})
export class MypostDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MypostDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  delete(data){
    data.mode = 'delete';
    this.dialogRef.close(data);
}


}
