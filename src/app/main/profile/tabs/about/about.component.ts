import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { mirapiAnimations } from '@mirapi/animations';
import { ProfileService } from 'app/main/profile/profile.service';
import { UserAboutUpdateModal } from './userAboutUpdateModal';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AuthService } from 'app/shared/services/auth.service';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SelectCarComponent } from 'app/main/admin/cars/select-car/select-car.component';


@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : mirapiAnimations
})


export class ProfileAboutComponent implements OnInit, OnDestroy
{
    about: any;
    value = '';
    isEditing: boolean;
    gender: string;
    userAbout: UserAboutUpdateModal;
    userDetails: any;
    carName:  string;
    
    private _unsubscribeAll: Subject<any>;

  
    
    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        public dialog: MatDialog,
        private _profileService: ProfileService,
        private httpService: HttpRequestsService,
        private authService: AuthService
    )
    {
          this._unsubscribeAll = new Subject();
        this.userAbout = new UserAboutUpdateModal();


    }


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

    ngOnDestroy(): void
    {

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        
    }

    getUserDetails(){
      const userId = this.authService.getCurrentUserId();
       this.httpService.getList('Users/' + userId).then(data => {
          this.userAbout = data;
          this.carName = data['car']['name'];
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
        // this.userAbout.birthday = formatDate(this.userAbout.birthday, 'yyyy-MM-dd HH:mm:ss', 'en-US')
       
         this._profileService.updateUserAbout(this.userAbout);
         this.isEditing = false;
     
    }

    selectCar(): void {
        const dialogRef = this.dialog.open(SelectCarComponent, {
          width: '500px',
          data: {
            brandId : '',
            carId : ''
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result != null) {    

            this.userAbout.carId = result.carId;
            this._profileService.updateUserAbout(this.userAbout);
          } 
        });
      }

    
    
      

}
