import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { MirapiNavigationModule } from '@mirapi/components';
import { MirapiSharedModule } from '@mirapi/shared.module';

import { NavbarVerticalStyle2Component } from 'app/layout/components/navbar/vertical/style-2/style-2.component';

@NgModule({
    declarations: [
        NavbarVerticalStyle2Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        MirapiSharedModule,
        MirapiNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle2Component
    ]
})
export class NavbarVerticalStyle2Module
{
}
