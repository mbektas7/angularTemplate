import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { MirapiNavigationComponent } from './navigation.component';
import { MirapiNavVerticalItemComponent } from './vertical/item/item.component';
import { MirapiNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { MirapiNavVerticalGroupComponent } from './vertical/group/group.component';
import { MirapiNavHorizontalItemComponent } from './horizontal/item/item.component';
import { MirapiNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

        TranslateModule.forChild()
    ],
    exports     : [
        MirapiNavigationComponent
    ],
    declarations: [
        MirapiNavigationComponent,
        MirapiNavVerticalGroupComponent,
        MirapiNavVerticalItemComponent,
        MirapiNavVerticalCollapsableComponent,
        MirapiNavHorizontalItemComponent,
        MirapiNavHorizontalCollapsableComponent
    ]
})
export class MirapiNavigationModule
{
}
