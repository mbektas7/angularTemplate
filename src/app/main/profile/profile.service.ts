import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAboutUpdateModal } from './tabs/about/userAboutUpdateModal';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { AuthService } from 'app/shared/services/auth.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { environment } from 'environments/environment';

@Injectable()
export class ProfileService implements Resolve<any>
{
    timeline: any;
    about: any;
    photosVideos: any;
    userModal: any;
    userInfo: any;
    name: any;

    timelineOnChanged: BehaviorSubject<any>;
    aboutOnChanged: BehaviorSubject<any>;
    photosVideosOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private alertifyService: AlertifyService,
        private router: Router,
        private authService: AuthService,
        private httpService: HttpRequestsService
    )
    {
        // Set the defaults
        this.timelineOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        this.photosVideosOnChanged = new BehaviorSubject({});
    }

    updateUserAbout(userAbout: UserAboutUpdateModal){

        this.httpService.put('Users/' + userAbout.Id, userAbout).subscribe(data => {   
            this.alertifyService.success('Profiliniz Başarıyla Güncellendi.');
            this.router.navigateByUrl('/dashboard');  
          },
           error => {
            this.alertifyService.error('Güncelleme işlemi sırasında hata oluştu. \n' + error.error);
          } );
    }


    getUserDetails(): Observable<UserAboutUpdateModal> {

        const userId = this.authService.getCurrentUserId();
        this.userModal = this.httpService.getById('Users/', userId);
        return this.userModal;
      }


    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getTimeline(),
                this.getAbout(),
                this.getPhotosVideos()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get timeline
     */
    getTimeline(): Promise<any[]>
    {
        return null;
    }

    /**
     * Get about
     */
    getAbout(): Promise<any[]>
    {
        return null;
    }

    /**
     * Get photos & videos
     */
    getPhotosVideos(): Promise<any[]>
    {
        return null;
    }
    

    deleteProfileImage(){

    }

    uploadUserProfilePicture(data){
        let formData = new FormData();
        formData.append('picture',data)
      return   this.httpService.post('appfiles/userProfileImage', formData);
    }
    readProfileImage(){
      return  this.httpService.get(environment.rootPath + 'appfiles/userProfileImage');
    }

   

}
