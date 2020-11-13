import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { CheckInTypes } from 'enums/checkinTypes.enum';
import { MirapiNavigationService } from '@mirapi/components/navigation/navigation.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { navigation } from 'app/navigation/navigation';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private userId;
    lastEntranceAndExits = [];

    navigation: any;
    uploadUrl: 'dasdad';
    userList: any;
    user: User;
    userSub: Subscription;
    constructor(
        private authService: AuthService,
        private mirapiNavigationService: MirapiNavigationService,
        private httpRequestService: HttpRequestsService,
        private router: Router
    ) {
        

        // this.getEmployees();
    }


    async ngOnInit() {
        this.userSub = this.authService.user$.subscribe((user: User) => {
            this.user = user;
            if (this.user) {
              this.router.navigateByUrl("questions");
            }
           
          });
    }

 
    private async setNavigations() {
        this.navigation = navigation.slice();
        this.navigation = await this.removeUnauthorizedUrlsFromNavigation(
            this.navigation 
        );
        this.mirapiNavigationService.unregister('main');
        this.navigation = this.mirapiNavigationService.register(
            'main',
            this.navigation.slice()
        );
        // Set the main navigation as our current navigation
        this.mirapiNavigationService.setCurrentNavigation('main');
    }
    private removeUnauthorizedUrlsFromNavigation(array: any[]) {
        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            if (value.url) {
             
             
                
            } else if (value.children) {
                value.children = this.removeUnauthorizedUrlsFromNavigation(
                    value.children
                );
                if (!value.url && value.children.length === 0) {
                    array[i] = null;
                }
            }
        }
        return array.filter(a => a);
    }


}
