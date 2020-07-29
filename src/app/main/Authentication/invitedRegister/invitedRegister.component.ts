import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { mirapiAnimations } from '@mirapi/animations';
import { InviteRegisterService } from './inviteRegister.service';

import { Router } from '@angular/router';
import { MirapiProgressBarService } from '@mirapi/components/progress-bar/progress-bar.service';
import { AlertifyService } from 'app/shared/services/alertify.service';

@Component({
    selector: 'invitedRegister',
    templateUrl: './invitedRegister.component.html',
    styleUrls: ['./invitedRegister.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: mirapiAnimations
})
export class InvitedRegisterComponent implements OnInit, OnDestroy {
    user: any;
    // Private
    isSubmitClicked = false;
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _mirapiConfigService: MirapiConfigService,
        private _inviteRegisterService: InviteRegisterService,
        private router: Router,
        private progressBar: MirapiProgressBarService,
        private alertifyService:AlertifyService
    ) {
        // Configure the layout
        this._mirapiConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._inviteRegisterService.onUserChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => { this.user = user; });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    invitedRegister() {
        this.isSubmitClicked = true;
        this.progressBar.show();
        this._inviteRegisterService.updatePassword(this.user.userId, this.user.password)
            .subscribe((response) => {
                this.alertifyService.success('İşlem başarılı şekilde gerçekleşmiştir');
                this.router.navigateByUrl('/auth/login');
            }, (error) => {
                this.progressBar.hide();
                this.isSubmitClicked = false;
        });
        
    }





}
