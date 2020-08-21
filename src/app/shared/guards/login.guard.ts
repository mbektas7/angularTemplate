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
                
            const result: any = await this.httpRequestService.get(`Token/isAuthenticatedLoginThatPage?pageType=${route.data.pageType}`).toPromise();             
            switch (route.data.pageType) {
                case PageClaims.password:
                    return true;
                case PageClaims.profile:
                    return true;
                case PageClaims.calendar:
                    return true;
                default:
                    const logged = this.authService.isTokenValid();
                    if (result.data === true){
                        return true;
                    }
                else {
                    this.router.navigate(['/auth/login']);
    
                    return false;
                 }
            }
        } catch (error) {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }

}
