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

@Injectable()
export class ProfileDetailService   implements Resolve<any>{


  routeParams: any;
  user: User;

  onProfileChanged: BehaviorSubject<any>;

  constructor(
      private alertifyService : AlertifyService,
      private _httpClient: HttpRequestsService,
      private http: HttpClient,
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
              this.onProfileChanged.next(this.user);
              resolve(response["data"]);
          }, reject);
  });
}

updateUserAbout(userAbout: User){
    console.log(userAbout);
    this._httpClient.put('Users/' + userAbout.Id, userAbout).subscribe(data => {   
        this.alertifyService.success('Profiliniz Başarıyla Güncellendi.');
        this.router.navigateByUrl('/dashboard');  
      },
       error => {
        this.alertifyService.error('Güncelleme işlemi sırasında hata oluştu. \n' + error.error);
      } );
}




}
