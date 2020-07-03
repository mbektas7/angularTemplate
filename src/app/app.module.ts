import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import {enableProdMode} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

import { AlertifyService } from './shared/services/alertify.service';

import { PageClaims } from 'enums/pageTypes.enum';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {QuicklinkStrategy, QuicklinkModule} from 'ngx-quicklink';

import { LoginGuard } from './shared/guards/login.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const appRoutes: Routes = [
   

    {
        path        : 'auth/login',
        pathMatch   : 'full',
        loadChildren: () => import('./main/authentication/login/login.module').then(m => m.LoginModule),
    
    },
    {
        path        : 'auth/register',
        loadChildren: () => import('./main/authentication/register/register.module').then(m => m.RegisterModule)

    },
    {
        path      : 'auth/invited',
        loadChildren: () => import('./main/authentication/invitedRegister/invitedRegister.module').then(m => m.InvitedRegisterModule)
    },
    {
        path      : 'auth/np',
        loadChildren: () => import('./main/authentication/forgot-password/verifyForgotPassword/verifyForgotPassword.module').then(m => m.verifyForgotPasswordModule),
        
    },
    {
        path      : 'dashboard',
        pathMatch: 'full',
        loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [ LoginGuard]
    },
    {
        path        : 'profile',
        pathMatch: 'full',
        loadChildren: () => import('./main/profile/profile.module').then(m => m.ProfileModule),
    }
    ,
    {
        path      : 'password',
        pathMatch: 'full',
        loadChildren : () => import('./main/password/password.module').then(m => m.PasswordModule),
        canActivate: [ LoginGuard]

    },
    {
        path    : '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path      : '**',
        redirectTo: '../index.html',
        
    }
        
];


@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        QuicklinkModule,
        RouterModule.forRoot(appRoutes,{
            preloadingStrategy:QuicklinkStrategy
        }),
        MatDialogModule,
        TranslateModule.forRoot(),
        MatMomentDateModule,
        MatButtonModule,
        MatIconModule,
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
                 
        

        // App modules
        LayoutModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: 
    [AlertifyService,
    LoginGuard, {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_DATE_LOCALE, useValue: 'tr'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  
       ]
})
export class AppModule
{
}
