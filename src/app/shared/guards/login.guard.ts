import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { PageClaims } from 'enums/pageTypes.enum';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router, private httpRequestService: HttpRequestsService){}
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean>{
                
            try {
                if (this.authService.isTokenValid()) {
                    console.log("user logged in");
                    return true;
                }
                else {
                    console.log("user not logged in");
                    this.router.navigate(['/auth/login']);

                }
            } catch (error) {
                this.router.navigate(['/auth/login']);
                return false;
            }
     
    }

    isPageTypeAuthenticated(pageType: any): any {
        const pageTypes: string = this.authService.getPageTypes();
        if (pageType === PageClaims.dashboard) {
            return true;
        }
        let isAuthenticated = false;
        const pageTypesArray = pageTypes.split('-');

        for (let i = 0; i < pageTypesArray.length; i++) {
            const element = pageTypesArray[i];
            if (element === pageType) {
                isAuthenticated = true;
                break;
            }

        }
        return  isAuthenticated;
    }
}
