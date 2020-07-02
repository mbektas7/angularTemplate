import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { RegisterComponent } from 'app/main/authentication/register/register.component';
import { MailConfirmComponent } from './mail-confirm/mail-confirm.component';
import { InviteRegisterService } from '../invitedRegister/inviteRegister.service';
import { MailConfirmService } from './mail-confirm/mail-confirm.service';

const routes = [
    {
        path     : '',
        component: RegisterComponent
    },
    {
        path     : 'mail-confirm',
        component: MailConfirmComponent,
        resolve  : {
            data: MailConfirmService
        }
    },
    {
        path     : 'mail-confirm/:id',
        component: MailConfirmComponent,
        resolve  : {
            data: MailConfirmService
        }
    }
];

@NgModule({
    declarations: [
        RegisterComponent,
        MailConfirmComponent
    ],
    providers :[
        MailConfirmService,InviteRegisterService
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatButtonToggleModule,

        FuseSharedModule
        
    ]
})
export class RegisterModule
{
}
