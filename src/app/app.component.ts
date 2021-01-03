import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { MirapiNavigationService } from '@mirapi/components/navigation/navigation.service';
import { MirapiSidebarService } from '@mirapi/components/sidebar/sidebar.service';
import { MirapiSplashScreenService } from '@mirapi/services/splash-screen.service';
import { MirapiTranslationLoaderService } from '@mirapi/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { User } from './shared/models/user';
import { AuthService } from './shared/services/auth.service';
import { LoginDTO } from './shared/models/LoginDTO';

@Component({
    selector   : 'app',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
    mirapiConfig: any;
    navigation: any;
   
    // Private
    private _unsubscribeAll: Subject<any>;
    user: User;
    userSub: Subscription;

    constructor(
        private authService : AuthService,
        @Inject(DOCUMENT) private document: any,
        private _mirapiConfigService: MirapiConfigService,
        private _mirapiNavigationService: MirapiNavigationService,
        private _mirapiSidebarService: MirapiSidebarService,
        private _mirapiSplashScreenService: MirapiSplashScreenService,
        private _mirapiTranslationLoaderService: MirapiTranslationLoaderService,
        private _translateService: TranslateService,
    )
    {

        
        // Get default navigation
        this.navigation = navigation;
    
        // Register the navigation to the service
        this._mirapiNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._mirapiNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('tr');

        // Set the navigation translations
        this._mirapiTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('tr');

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {

        // Subscribe to config changes
        this._mirapiConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.mirapiConfig = config;

                // Boxed
                if ( this.mirapiConfig.layout.width === 'boxed' )
                {
                    this.document.body.classList.add('boxed');
                }
                else
                {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for ( let i = 0; i < this.document.body.classList.length; i++ )
                {
                    const className = this.document.body.classList[i];

                    if ( className.startsWith('theme-') )
                    {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.mirapiConfig.colorTheme);
            });

           
    }

  
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.userSub.unsubscribe();
    }

   
    toggleSidebarOpen(key): void
    {
        this._mirapiSidebarService.getSidebar(key).toggleOpen();
    }


}
