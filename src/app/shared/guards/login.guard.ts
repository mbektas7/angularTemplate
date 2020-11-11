import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { PageTypes } from 'enums/pageTypes.enum';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor( private alertify: AlertifyService, private router: Router, private httpRequestService: HttpRequestsService){}
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean>{
                
        try {
                
            const result: any = await this.httpRequestService.get(`Token/isAuthenticatedLoginThatPage?pageType=${route.data.pageType}`).toPromise();             
           if (route.data.pageType == PageTypes.questions) {
               console.log("1");
               return true;
           }
           if (result.data === true){
            console.log("2");
            return true;
        }
           
           else {
            this.router.navigate(['/auth/login']);
            console.log("3");
            return false;
        }
        } catch (error) {

                this.router.navigate(['/auth/login']);
                return false;            
           
        }
    }

}