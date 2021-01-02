import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MirapiSharedModule } from '@mirapi/shared.module';
import { verifyforgotpasswordComponent } from './verifyForgotPassword.component';
import { verifyforgotpasswordService } from './verifyforgotpassword.service';



const routes = [
    {
        path     : ':id',
        component: verifyforgotpasswordComponent,
        resolve  : {
            data: verifyforgotpasswordService
        }
      }
];

@NgModule({
    declarations: [
        verifyforgotpasswordComponent
    ],
    providers :[
        verifyforgotpasswordService
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        MirapiSharedModule
        
    ]
})
export class verifyForgotPasswordModule
{
}
