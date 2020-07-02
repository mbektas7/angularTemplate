import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AlertifyService } from 'app/shared/services/alertify.service';

@Injectable()
export class InviteRegisterService implements Resolve<any>
{
    routeParams: any;
    user: any;
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
                this.getUserDetails()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getUserDetails(): Promise<any>
    {
         return new Promise((resolve, reject) => {          
                this._httpClient.get('Employee/verify/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.user = response['data'];
                        this.onUserChanged.next(this.user);
                        resolve(response['data']);
                    }, reject);
            
        });
        return null;
    } 

    verifyCode(code): Promise<any>
    {

         return new Promise((resolve, reject) => {          
                this._httpClient.get('Employee/verify/' + code)
                    .subscribe((response: any) => {
                        this.user = response['data'];
                        this.onUserChanged.next(this.user);
                        resolve(response['data']);
                        this._alertifyService.warning(response['message']);
                    }, reject);
            
        });
    }

    updatePassword(userId, password){

        const data = {newPass: password};
            return this._httpClient.post('Users/'+ userId + "/password", data);
        

    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveUser(user): Promise<any>
    {
       return new Promise((resolve, reject) => {
            this._httpClient.put('User/' + this.routeParams.id, user)
                .subscribe((response: any) => {
                    this._alertifyService.success('Başarıyla güncellendi.');
                    resolve(response);
                    this.router.navigateByUrl('/auth/login');
                }, reject);
        });
    }

}
