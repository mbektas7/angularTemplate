import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { verifyForgotPasswordComponent } from './verifyForgotPassword.component';
import { verifyForgotPasswordService } from './verifyForgotPassword.service';



const routes = [
    {
        path     : ':id',
        component: verifyForgotPasswordComponent,
        resolve  : {
            data: verifyForgotPasswordService
        }
      }
];

@NgModule({
    declarations: [
        verifyForgotPasswordComponent
    ],
    providers :[
        verifyForgotPasswordService
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
        
    ]
})
export class verifyForgotPasswordModule
{
}
