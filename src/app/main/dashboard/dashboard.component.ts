import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { CheckInTypes } from 'enums/checkinTypes.enum';
import { MirapiNavigationService } from '@mirapi/components/navigation/navigation.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { navigation } from 'app/navigation/navigation';
import { PageClaims } from 'enums/pageTypes.enum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private userId;
    lastEntranceAndExits = [];

    displayedColumns: string[] = [
        'Giriş Zamanı',
        'Çıkış Zamanı',
        'Gün',
        'Çalışılması Gereken Süre',
        'Çalışılan Süre'
    ];
    navigation: any;
    uploadUrl: 'dasdad';
    userList: any;
    constructor(
        private authService: AuthService,
        private mirapiNavigationService: MirapiNavigationService,
        private httpRequestService: HttpRequestsService,
        private router: Router
    ) {
        this.userId = this.authService.getCurrentUserId();
 
   

        // this.getEmployees();
    }


    async ngOnInit() {

    }

    getFiveDaysAgoFromNow(): any {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
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
                const result: any = this.isPageTypeAuthenticated(
                    value.pageType
                );
                if (result === false) {
                    array[i] = null;
                }
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
        return isAuthenticated;
    }

}
