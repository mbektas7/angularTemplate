import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MirapiProgressBarModule } from '@mirapi/components';
import { MirapiSharedModule } from '@mirapi/shared.module';

import { AlertifyService } from 'app/shared/services/alertify.service';
import { AuthService } from 'app/shared/services/auth.service';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';


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
        MirapiProgressBarModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        MirapiSharedModule,
        BotDetectCaptchaModule,
        FormsModule,                            
        ReactiveFormsModule 
    ],
    providers: [AlertifyService],
})
export class LoginModule
{
}
