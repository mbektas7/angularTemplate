import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { MirapiNavigationService } from '@mirapi/components/navigation/navigation.service';
import { MirapiPerfectScrollbarDirective } from '@mirapi/directives/mirapi-perfect-scrollbar/mirapi-perfect-scrollbar.directive';
import { MirapiSidebarService } from '@mirapi/components/sidebar/sidebar.service';

@Component({
    selector     : 'navbar-vertical-style-2',
    templateUrl  : './style-2.component.html',
    styleUrls    : ['./style-2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle2Component implements OnInit, OnDestroy
{
    mirapiConfig: any;
    navigation: any;

    // Private
    private _mirapiPerfectScrollbar: MirapiPerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MirapiConfigService} _mirapiConfigService
     * @param {MirapiNavigationService} _mirapiNavigationService
     * @param {MirapiSidebarService} _mirapiSidebarService
     * @param {Router} _router
     */
    constructor(
        private _mirapiConfigService: MirapiConfigService,
        private _mirapiNavigationService: MirapiNavigationService,
        private _mirapiSidebarService: MirapiSidebarService,
        private _router: Router
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(MirapiPerfectScrollbarDirective,null)
    set directive(theDirective: MirapiPerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._mirapiPerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._mirapiNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._mirapiPerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                        if ( activeNavItem )
                        {
                            const activeItemOffsetTop       = activeNavItem.offsetTop,
                                  activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                                  scrollDistance            = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3);

                            this._mirapiPerfectScrollbar.scrollToTop(scrollDistance);
                        }
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if ( this._mirapiSidebarService.getSidebar('navbar') )
                    {
                        this._mirapiSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Get current navigation
        this._mirapiNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._mirapiNavigationService.getCurrentNavigation();
            });

        // Subscribe to the config changes
        this._mirapiConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.mirapiConfig = config;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void
    {
        this._mirapiSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._mirapiSidebarService.getSidebar('navbar').toggleFold();
    }
}
