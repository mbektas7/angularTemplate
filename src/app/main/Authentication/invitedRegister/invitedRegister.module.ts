import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { InvitedRegisterComponent } from './invitedRegister.component';
import { InviteRegisterService } from './inviteRegister.service';


const routes = [
    {
        path     : '',
        component: InvitedRegisterComponent
    },
    {
        path     : ':id',
        component: InvitedRegisterComponent,
        resolve  : {
            data: InviteRegisterService
        }
      }
];

@NgModule({
    declarations: [
        InvitedRegisterComponent
    ],
    providers :[
        InviteRegisterService
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
export class InvitedRegisterModule
{
}
