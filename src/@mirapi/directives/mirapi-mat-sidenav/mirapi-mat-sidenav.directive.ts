import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MirapiMatchMediaService } from '@mirapi/services/match-media.service';
import { MirapiMatSidenavHelperService } from '@mirapi/directives/mirapi-mat-sidenav/mirapi-mat-sidenav.service';

@Directive({
    selector: '[mirapiMatSidenavHelper]'
})
export class MirapiMatSidenavHelperDirective implements OnInit, OnDestroy
{
    @HostBinding('class.mat-is-locked-open')
    isLockedOpen: boolean;

    @Input()
    mirapiMatSidenavHelper: string;

    @Input()
    matIsLockedOpen: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MirapiMatchMediaService} _mirapiMatchMediaService
     * @param {MirapiMatSidenavHelperService} _mirapiMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {MediaObserver} _mediaObserver
     */
    constructor(
        private _mirapiMatchMediaService: MirapiMatchMediaService,
        private _mirapiMatSidenavHelperService: MirapiMatSidenavHelperService,
        private _matSidenav: MatSidenav,
        private _mediaObserver: MediaObserver
    )
    {
        // Set the defaults
        this.isLockedOpen = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Register the sidenav to the service
        this._mirapiMatSidenavHelperService.setSidenav(this.mirapiMatSidenavHelper, this._matSidenav);

        if ( this._mediaObserver.isActive(this.matIsLockedOpen) )
        {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }

        this._mirapiMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if ( this._mediaObserver.isActive(this.matIsLockedOpen) )
                {
                    this.isLockedOpen = true;
                    this._matSidenav.mode = 'side';
                    this._matSidenav.toggle(true);
                }
                else
                {
                    this.isLockedOpen = false;
                    this._matSidenav.mode = 'over';
                    this._matSidenav.toggle(false);
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

@Directive({
    selector: '[mirapiMatSidenavToggler]'
})
export class MirapiMatSidenavTogglerDirective
{
    @Input()
    mirapiMatSidenavToggler: string;

    /**
     * Constructor
     *
     * @param {MirapiMatSidenavHelperService} _mirapiMatSidenavHelperService
     */
    constructor(
        private _mirapiMatSidenavHelperService: MirapiMatSidenavHelperService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick(): void
    {
        this._mirapiMatSidenavHelperService.getSidenav(this.mirapiMatSidenavToggler).toggle();
    }
}
