import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { MirapiNavigationService } from '@mirapi/components/navigation/navigation.service';
import { MirapiPerfectScrollbarDirective } from '@mirapi/directives/mirapi-perfect-scrollbar/mirapi-perfect-scrollbar.directive';
import { MirapiSidebarService } from '@mirapi/components/sidebar/sidebar.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from 'app/main/profile/profile.service';
import { AuthService } from 'app/shared/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector     : 'navbar-horizontal-style-1',
    templateUrl  : './style-1.component.html',
    styleUrls    : ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarHorizontalStyle1Component implements OnInit, OnDestroy
{
    mirapiConfig: any;
    mirapiPerfectScrollbarUpdateTimeout: any;
    navigation: any;

    // Private
    private _mirapiPerfectScrollbar: MirapiPerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;
    jwtHelper = new JwtHelperService();
    TOKEN_KEY = 'token';
    profileImage = 'data:image/png;base64,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';
    email: string;
    name: string;
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
        private _router: Router,
        private _authService: AuthService,
        private profileService: ProfileService,
        private _sanitizer: DomSanitizer
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(MirapiPerfectScrollbarDirective, {static: true})
    set directive(theDirective: MirapiPerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._mirapiPerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._mirapiNavigationService.onItemCollapseToggled
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.mirapiPerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this._mirapiPerfectScrollbar.update();
                }, 310);
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
                                  scrollDistance            = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;

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

        // Subscribe to the config changes
        this._mirapiConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.mirapiConfig = config;
            });

        // Get current navigation
        this._mirapiNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._mirapiNavigationService.getCurrentNavigation();
            });
  
            
      
            
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        if ( this.mirapiPerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.mirapiPerfectScrollbarUpdateTimeout);
        }

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
