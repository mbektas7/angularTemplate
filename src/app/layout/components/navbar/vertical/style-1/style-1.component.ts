import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { MirapiNavigationService } from '@mirapi/components/navigation/navigation.service';
import { MirapiPerfectScrollbarDirective } from '@mirapi/directives/mirapi-perfect-scrollbar/mirapi-perfect-scrollbar.directive';
import { MirapiSidebarService } from '@mirapi/components/sidebar/sidebar.service';
import { JwtHelper } from 'angular2-jwt';
import { User } from 'app/shared/models/user';
import { AuthService } from 'app/shared/services/auth.service';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector     : 'navbar-vertical-style-1',
    templateUrl  : './style-1.component.html',
    styleUrls    : ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy
{
    mirapiConfig: any;
    navigation: any;

    jwtHelper: JwtHelper = new JwtHelper();
    TOKEN_KEY = 'token';
    pendingPermissionsCount;
    name = '';
    email = '';
    isLoggedIn : boolean;
    profilImage :any;
    user: User;
    userSub: Subscription;
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
        private _router: Router,
        private authService : AuthService,
        private http : HttpRequestsService,
        private _sanitizer: DomSanitizer,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.userSub = this.authService.user$.subscribe((user: User) => {
            this.user = user;
            if (this.user) {
             
                if (user.photo) {
                    this.profilImage = user.photo.path;
                }
               
                this.name = user.Name;
                this.email = user.Username;
                this._mirapiNavigationService.updateNavigationItem('admin', {
                    hidden: false
                });
               // this.setProfileValues();
             this.isLoggedIn = true;
            } else {
                this._mirapiNavigationService.updateNavigationItem('admin', {
                    hidden: true
                });
                this.isLoggedIn = false; 
            }
             
          });


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


    getUserDetails(){
        const userId = this.user.Id.toString()
        
         this.http.getList('Users/' + userId).then(data => {
            this.name = data.Name;
            this.profilImage = data.avatar;
           // this.authService.userProfileImage = this.profilImage;
            if (data.isSocialLogin) {
                this.profilImage = 'data:image/jpg;base64,' +
            (this._sanitizer.bypassSecurityTrustResourceUrl(this.profilImage) as any).changingThisBreaksApplicationSecurity;
            }
            
        });
        
    }

      setProfileValues(){

        const userId = this.user.Id.toString()
        
        this.http.getList('Users/' + userId).then(data => {
           this.name = data.Name;
           this.profilImage = data['photo']['path'];
         
         //  this.authService.userProfileImage = this.profilImage;
           if (data.isSocialLogin) {
               this.profilImage = 'data:image/jpg;base64,' +
           (this._sanitizer.bypassSecurityTrustResourceUrl(this.profilImage) as any).changingThisBreaksApplicationSecurity;
           }
           
       });
      }
}
