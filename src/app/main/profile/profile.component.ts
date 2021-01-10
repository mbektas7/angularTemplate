import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { mirapiAnimations } from '@mirapi/animations';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AuthService } from 'app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { User } from '../../shared/models/user';
import { UserAboutUpdateModal } from './tabs/about/userAboutUpdateModal';
import { UserPhoto } from './UserPhoto';
import { Subject, Subscription } from 'rxjs';
import { ProfileDetailService } from './profil-detail.service';
import { takeUntil } from 'rxjs/operators';
import { MirapiProgressBarService } from '@mirapi/components/progress-bar/progress-bar.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : mirapiAnimations
})
export class ProfileComponent implements OnInit
{
  private _unsubscribeAll: Subject<any>;
    name: string;
    userModal = new UserAboutUpdateModal;
    profileImage: any;
    isLoggedIn : false;
    userLoggedIn: User;
    userSub: Subscription;
    user : User;
    constructor(
        private profileDetailService: ProfileDetailService,
        private httpservice: HttpRequestsService,
        private authService: AuthService,
        private _sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private progressBar : MirapiProgressBarService,
        private router : Router,
        private alertifyService: AlertifyService)
    {
      this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {

      this.userSub = this.authService.user$.subscribe((user: User) => {
        this.userLoggedIn = user;
        if (this.userLoggedIn) {
          this.userLoggedIn.Name = user.Name;
          this.profileImage = user.photo ? user.photo : "";
        }
       
      });

      this.profileDetailService.onProfileChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
       this.user = data;
      
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
       this.progressBar.show();
       let photo = new UserPhoto();
       photo.baseData = image;

       this.httpservice.addItem("users/addPhoto",photo).then( ()=>{
       
        this.progressBar.hide();
        this.router.navigateByUrl('/questions');  
       } );

     }


     sendMessage(){
       console.log("mesaj gönder");
     }


}
