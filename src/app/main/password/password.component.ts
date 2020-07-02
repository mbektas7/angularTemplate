import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  
})
export class PasswordComponent implements OnInit {
   
   model: any;
   isSubmiting = false
    constructor(private httpClient: HttpRequestsService, private alertifyService: AlertifyService,private router:Router) {
        this.model = {};
    }
    ngOnInit(): void {

    }
    onSubmit(){
        this.isSubmiting = true;
         this.httpClient.post('Users/changePassword', this.model).subscribe((res) => {
            this.alertifyService.success('Şifreniz başarıyla değiştirilmiştir');
            this.router.navigateByUrl('apps/dashboard');
            
         }, error => {

            this.alertifyService.error('Şifre değiştirilemedi lütfen şifrenizi kontrol ediniz');
             this.isSubmiting = false;
         }, () => {
             this.isSubmiting = false;
         });
    }


}
