import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
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

import { MirapiModule } from '@mirapi/mirapi.module';
import { MirapiSharedModule } from '@mirapi/shared.module';
import { MirapiProgressBarModule, MirapiSidebarModule, MirapiThemeOptionsModule } from '@mirapi/components';

import { mirapiConfig } from 'app/mirapi-config';
import {enableProdMode} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

import { AlertifyService } from './shared/services/alertify.service';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import {QuicklinkStrategy, QuicklinkModule} from 'ngx-quicklink';

import { LoginGuard } from './shared/guards/login.guard';

import { AdminModule } from './main/admin/admin.module';
import { QuestionsModule } from './main/questions/questions.module';
import { MypostsModule } from './main/myposts/myposts.module';
import { BlogModule } from './main/blog/blog.module';
import { PageTypes } from 'enums/pageTypes.enum';
import { AuthService } from './shared/services/auth.service';
import { ToolbarModule } from './layout/components/toolbar/toolbar.module';
import { HomeGueard } from './shared/guards/home.guard';

import { TokenInterceptor } from './shared/services/token.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardModule } from './main/dashboard/dashboard.module';
import { ChatModule } from './main/chat/chat.module';
import { LoginModalComponent } from './main/Authentication/login-modal/login-modal.component';





const appRoutes: Routes = [
   

    {
        path        : 'auth/login',
        pathMatch   : 'full',
        loadChildren: () => import('./main/Authentication/login/login.module').then(m=>m.LoginModule)
    },
    {
        path        : 'auth/register',
        loadChildren: () => import('./main/Authentication/register/register.module').then(m=>m.RegisterModule)

    },
    {
        path      : 'auth/np',
        loadChildren: () => import('./main/authentication/forgot-password/verifyForgotPassword/verifyForgotPassword.module').then(m => m.verifyForgotPasswordModule),
        
    },
    {
        path        : 'questions',
        loadChildren: './main/questions/questions.module#QuestionsModule',
      
       
    },
    {
        path        : 'blog',
        loadChildren: './main/blog/blog.module#BlogModule',
    },
    {
        path        : 'profile',
        loadChildren: () => import('./main/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard],
        data: {pageType: PageTypes.profile}
    },
    {
        path        : 'myposts',
       
        loadChildren: () => import('./main/myposts/myposts.module').then(m => m.MypostsModule),
        canActivate: [AuthGuard],
        data: {pageType: PageTypes.myposts}
    },
    {
        path        : 'dashboard',
        loadChildren:() => import("./main/dashboard/dashboard.module").then(m=>m.DashboardModule),
        canActivate: [AuthGuard],
    },
    {
        path        : 'chat',
        loadChildren:() => import("./main/chat/chat.module").then(m=>m.ChatModule),
        canActivate: [AuthGuard],
    },
    {
        path        : 'admin',
        canActivate: [AuthGuard],
        
        loadChildren: () => import('./main/admin/admin.module').then(m => m.AdminModule),
        data: {pageType: PageTypes.admin},
    },

    {
        path      : 'password',
      
        loadChildren : () => import('./main/password/password.module').then(m => m.PasswordModule),
        canActivate: [AuthGuard],

    },
    {
        path      : '**',
        redirectTo: '/questions',
        pathMatch   : 'full',
    }        
];


@NgModule({
    declarations: [
        AppComponent
        
    ],
    exports: [RouterModule],
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
        MirapiModule.forRoot(mirapiConfig),
        MirapiProgressBarModule,
        MirapiSharedModule,
        MirapiSidebarModule,
        MirapiThemeOptionsModule,
                 
        /// social logins
        SocialLoginModule,

        // App modules
        ToolbarModule,
        LayoutModule,
        AdminModule,
        QuestionsModule,
        MypostsModule,
        BlogModule,
        DashboardModule,
        ChatModule
        
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: 
    [AlertifyService,  
    AuthGuard,  

    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_DATE_LOCALE, useValue: 'tr'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                '601878090181-eogcprfmakh6s1o09i0bksd7rllf2ls2.apps.googleusercontent.com'
              ),
            },
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('690120018581448'),
            },
          ],
        } as SocialAuthServiceConfig,
      }
       ]
})
export class AppModule
{
}
