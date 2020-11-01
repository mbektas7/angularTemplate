import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { mirapiAnimations } from '@mirapi/animations';
import { ProfileService } from './profile.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AuthService } from 'app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { User } from './user';
import { UserAboutUpdateModal } from './tabs/about/userAboutUpdateModal';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : mirapiAnimations
})
export class ProfileComponent implements OnInit
{

    name: string;
    userModal = new UserAboutUpdateModal;
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

    this.profileService.getUserDetails().subscribe(data=>{
      this.profileImage = data["data"].avatar;
  
      if (data["isSocialLogin"]) {
        this.profileImage = 'data:image/jpg;base64,' +
        (this._sanitizer.bypassSecurityTrustResourceUrl(this.profileImage) as any).changingThisBreaksApplicationSecurity;
      }
     
    });

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

      var file = files[0];
      if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }


    }

    _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
             this.updatePhoto(btoa(binaryString));
     }


     updatePhoto(image : string){
       this.userModal.avatar = image;
       this.httpservice.addItem("users/changeProfilPhoto",this.userModal).then( ()=>{

        this.profileService.getUserDetails().subscribe(data=>{
          this.profileImage = data["data"].avatar
        });
       } );

     }


}
