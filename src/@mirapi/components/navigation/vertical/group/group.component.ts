import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MirapiNavigationItem } from '@mirapi/types';
import { MirapiNavigationService } from '@mirapi/components/navigation/navigation.service';

@Component({
    selector   : 'mirapi-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class MirapiNavVerticalGroupComponent implements OnInit, OnDestroy
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: MirapiNavigationItem;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {MirapiNavigationService} _mirapiNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _mirapiNavigationService: MirapiNavigationService
    )
    {
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
        // Subscribe to navigation item
        merge(
            this._mirapiNavigationService.onNavigationItemAdded,
            this._mirapiNavigationService.onNavigationItemUpdated,
            this._mirapiNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {

             // Mark for check
             this._changeDetectorRef.markForCheck();
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
