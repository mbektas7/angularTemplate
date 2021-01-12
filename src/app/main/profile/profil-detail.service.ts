import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { HttpClient } from '@angular/common/http';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { SaveAnswer } from 'app/main/admin/posts/saveAnswer';
import { User } from '../../shared/models/user';
import { UserAboutUpdateModal } from './tabs/about/userAboutUpdateModal';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { AuthService } from 'app/shared/services/auth.service';

@Injectable()
export class ProfileDetailService   implements Resolve<any>{


  routeParams: any;
  user: User;

  onProfileChanged: BehaviorSubject<any>;

  constructor(
      private alertifyService : AlertifyService,
      private _httpClient: HttpRequestsService,
      private http: HttpClient,
      private authService : AuthService,
      private router: Router,
  )
  {
    
      this.onProfileChanged = new BehaviorSubject({});
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {
        Promise.all([this.getUserDetails()]).then(() => {
            resolve();
        }, reject);
    });
}



getUserDetails(): Promise<any> {
  return new Promise((resolve, reject) => {
      this._httpClient
          .get('users/' + this.routeParams.id)
          .subscribe((response: any) => {
              this.user = response["data"];
              // böyle olduğunda başkasının profilne girince kullanıcıyı değiştiriyor direk. kendi kullanıcısı ise yapmalı.
            //   this.authService.user$.next(this.user);
            //   this.authService.getCurrentUser().subscribe();
              this.onProfileChanged.next(this.user);
              resolve(response["data"]);
          }, reject);
  });
}

updateUserAbout(userAbout: User){

    return new Promise((resolve, reject) => {

        
        
        this._httpClient.put('Users/'+userAbout.Id,userAbout).subscribe((response: any) => {
            this.user = response["data"];
            this.authService.user$.next(this.user);
            this.authService.getCurrentUser().subscribe();
            this.onProfileChanged.next(this.user);
            resolve(response["data"]);
        }, reject);
    });

}


getUserQuestions(): Promise<any> {


        return  new Promise((resolve, reject) => {
            this._httpClient.get('post/getUserPosts/'+this.routeParams.id).subscribe((response: any) => {
                resolve(response["data"]);
            }, reject);
        });

  }

  updatePost(data:PostModel): Promise<any>
  {

      return  new Promise((resolve, reject) => {
         this._httpClient.put('post/'+data.Id,data).subscribe((response:any) => {
             resolve(response["data"]);
         },reject)

  });
   }




}
