import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MirapiNavigationService } from '@mirapi/components/navigation/navigation.service';

@Component({
    selector       : 'mirapi-navigation',
    templateUrl    : './navigation.component.html',
    styleUrls      : ['./navigation.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MirapiNavigationComponent implements OnInit
{
    @Input()
    layout = 'horizontal';

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

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
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._mirapiNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._mirapiNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Load the navigation
                this.navigation = this._mirapiNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

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
}
