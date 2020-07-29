import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { MirapiNavigationModule } from '@mirapi/components';
import { MirapiSharedModule } from '@mirapi/shared.module';

import { NavbarHorizontalStyle1Component } from 'app/layout/components/navbar/horizontal/style-1/style-1.component';
import { ProfileService } from 'app/main/profile/profile.service';

@NgModule({
    declarations: [
        NavbarHorizontalStyle1Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        MirapiSharedModule,
        MirapiNavigationModule
    ],
    exports     : [
        NavbarHorizontalStyle1Component
    ],
    providers: [ProfileService]
})
export class NavbarHorizontalStyle1Module
{
}
