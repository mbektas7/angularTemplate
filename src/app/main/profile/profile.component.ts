import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from './profile.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AuthService } from 'app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertifyService } from 'app/shared/services/alertify.service';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent implements OnInit
{

    
    name: string;
    userModal: any;
    profileImage: any;
    constructor(
        private profileService: ProfileService,
        private httpservice: HttpRequestsService,
        private authService: AuthService,
        private _sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private alertifyService: AlertifyService)
    {
    }

    ngOnInit(): void {
        this.name = this.authService.getCurrentUserName();
        if(this.authService.isTokenValid()){
            this.profileService.readProfileImage().subscribe((res: any) => {
                if (res.data && res.data.length > 0){
                    this.profileImage = res.data[0].appFile.url;
                    this.profileImage = 'data:image/jpg;base64,' +
                     (this._sanitizer.bypassSecurityTrustResourceUrl(this.profileImage) as any).changingThisBreaksApplicationSecurity;
                
                }
            });
        }
     
    }
    async uploadProfileImage(files){
        if (files.length === 0) {
        return;
        }
   
      let mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.alertifyService.warning(  'Sadece resim yükleyebilirsiniz');
        return;
      }
      if(files.length>10 * 1024 * 1024){
          this.alertifyService.warning('Resim en fazla 10 MB olabilir')
      }
      await this.profileService.uploadUserProfilePicture(files[0]).toPromise();
      let reader = new FileReader();
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        this.profileImage = reader.result; 
        
      };   
     
    }
    



}
