import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/profile/profile.service';
import { UserAboutUpdateModal } from './userAboutUpdateModal';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AuthService } from 'app/shared/services/auth.service';
import { formatDate } from '@angular/common';


@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})


export class ProfileAboutComponent implements OnInit, OnDestroy
{
    about: any;
    value = '';
    isEditing: boolean;
    gender: string;
    userAbout: UserAboutUpdateModal;
    userDetails: any;
    
    private _unsubscribeAll: Subject<any>;

  
    
    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private httpService: HttpRequestsService,
        private authService: AuthService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.userAbout = new UserAboutUpdateModal();


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.isEditing = false;
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
            this.about = about;
        });
        
        this.getUserDetails();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        
    }

    getUserDetails(){
      const userId = this.authService.getCurrentUserId();
      this.httpService.getList('Users/' + userId).then(data => {
          this.userAbout = data;
          if(this.userAbout.dateOfStart.includes('0001-01-01T')){
            this.userAbout.dateOfStart = new Date().toISOString();
          }
          if(this.userAbout.birthday.includes('0001-01-01T')){
              this.userAbout.birthday = new Date().toISOString();
          }
          if (this.userAbout.isFemale) {
            this.gender = '1';
        }
        else { this.gender = '0'; }
      });
      
  }

    edit(){
      
        this.isEditing = true;
    }

    save(){
       
        if (this.gender === '0') {
            this.userAbout.isFemale = false;
        }
        else {
            this.userAbout.isFemale = true;
        }
        this.userAbout.birthday = formatDate(this.userAbout.birthday, 'yyyy-MM-dd HH:mm:ss', 'en-US')
        this.userAbout.dateOfStart = formatDate(this.userAbout.dateOfStart, 'yyyy-MM-dd HH:mm:ss', 'en-US') 
 
        this._profileService.updateUserAbout(this.userAbout);
        //this.isEditing = false;

      //  location.reload();
    }

    
    
      

}
