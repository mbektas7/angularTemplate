import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseProgressBarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from 'app/main/authentication/login/login.component';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { AuthService } from 'app/shared/services/auth.service';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes = [

    {
        path     : '',
        component: LoginComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports :[
        RouterModule.forChild(routes),
        FuseProgressBarModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        FuseSharedModule,
        BotDetectCaptchaModule,
        FormsModule,                               // <========== Add this line!
        ReactiveFormsModule 
    ],
    providers: [AlertifyService,AuthService],
})
export class LoginModule
{
}
