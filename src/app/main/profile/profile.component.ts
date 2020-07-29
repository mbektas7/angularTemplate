import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { mirapiAnimations } from '@mirapi/animations';
import { ProfileService } from './profile.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AuthService } from 'app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertifyService } from 'app/shared/services/alertify.service';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : mirapiAnimations
})
export class ProfileComponent implements OnInit
{

    name: string;
    userModal: any;
    constructor(
        private profileService: ProfileService,
        private httpservice: HttpRequestsService,
        private authService: AuthService,
        private _sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private alertifyService: AlertifyService)
    {
    }

    ngOnInit(): void {
        this.name = this.authService.getCurrentUserName();
    }


}
