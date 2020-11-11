import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { PageTypes } from 'enums/pageTypes.enum';

@Injectable()
export class HomeGueard implements CanActivate ,CanLoad {
    constructor(private authService : AuthService, private router: Router, private httpRequestService: HttpRequestsService){}


    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean>{
       return this.canLoad();
    }

    canLoad() {
        if (!this.authService.loggedIn()) {
          this.router.navigate(['/login']);
        }
        return this.authService.loggedIn();
      }

}