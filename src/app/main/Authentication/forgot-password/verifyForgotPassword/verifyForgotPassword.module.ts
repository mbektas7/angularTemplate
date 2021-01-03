import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MirapiSharedModule } from '@mirapi/shared.module';
import { verifyforgotpasswordComponent } from './verifyforgotpassword.component';
import { verifyforgotpasswordservice } from './verifyforgotpassword.service';



const routes = [
    {
        path     : ':id',
        component: verifyforgotpasswordComponent,
        resolve  : {
            data: verifyforgotpasswordservice
        }
      }
];

@NgModule({
    declarations: [
        verifyforgotpasswordComponent
    ],
    providers :[
        verifyforgotpasswordservice
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
export class verifyforgotpasswordModule
{
}
