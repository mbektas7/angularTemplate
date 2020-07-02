import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AlertifyService } from 'app/shared/services/alertify.service';

@Injectable()
export class MailConfirmService implements Resolve<any> {

  routeParams: any;
  isConfirm: any;
  onUserChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
      private _httpClient: HttpRequestsService,
      private _alertifyService: AlertifyService,
      private router: Router
  )
  {
      // Set the defaults
      this.onUserChanged = new BehaviorSubject({});
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
      this.routeParams = route.params;

      return new Promise((resolve, reject) => {

          Promise.all([
              this.confirmMail()
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }

  confirmMail(): Promise<any>
  {
      this.isConfirm = false;
      if (this.routeParams.id){
        return new Promise((resolve, reject) => {          
          this._httpClient.get('Users/' + this.routeParams.id + '/confirmmail')
              .subscribe((response: any) => {                               
                  this.isConfirm = response['data'];
                  this.onUserChanged.next(this.isConfirm);
                  resolve(response['data']);
              }, reject);      
  });
      }
    else {   
      return null;
      }
  }
}
