import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { MirapiNavigationModule } from '@mirapi/components';
import { MirapiSharedModule } from '@mirapi/shared.module';

import { NavbarVerticalStyle1Component } from 'app/layout/components/navbar/vertical/style-1/style-1.component';

@NgModule({
    declarations: [
        NavbarVerticalStyle1Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        MirapiSharedModule,
        MirapiNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle1Component
    ]
})
export class NavbarVerticalStyle1Module
{
}
