import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpRequestsService } from 'app/shared/services/httpRequests.service';


export interface  dialogData {
  
  Username: string;
  Password: string;
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
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