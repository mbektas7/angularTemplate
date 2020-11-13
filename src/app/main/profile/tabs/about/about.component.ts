import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { mirapiAnimations } from '@mirapi/animations';
import { UserAboutUpdateModal } from './userAboutUpdateModal';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AuthService } from 'app/shared/services/auth.service';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SelectCarComponent } from 'app/main/admin/cars/select-car/select-car.component';
import { User } from '../../../../shared/models/user';
import { ProfileDetailService } from '../../profil-detail.service';


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
    user: User;
    userLoggedIn : User;
    userSub: Subscription;
  
    
    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        public dialog: MatDialog,
        private _profileService: ProfileDetailService,
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
        this._profileService.onProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
              console.log(user);
            this.user = user;

        });

        this.userSub = this.authService.user$.subscribe((user: User) => {
          this.userLoggedIn = user;
         
        });
  
        
      //  this.getUserDetails();
    }

    ngOnDestroy(): void
    {

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        
    }

    getUserDetails(){
      const userId = this.user.Id.toString();
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
     
         this.user.Birthday =formatDate(this.user.Birthday, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
  
         this._profileService.updateUserAbout(this.user);
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

            this.user.car.id = result.carId;
            this._profileService.updateUserAbout(this.user);
          } 
        });
      }

    
    
      

}
