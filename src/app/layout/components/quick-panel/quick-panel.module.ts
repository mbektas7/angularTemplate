import { NgModule } from '@angular/core';
import { MatDividerModule, MatListModule, MatSlideToggleModule } from '@angular/material';

import { MirapiSharedModule } from '@mirapi/shared.module';

import { QuickPanelComponent } from 'app/layout/components/quick-panel/quick-panel.component';

@NgModule({
    declarations: [
        QuickPanelComponent
    ],
    imports     : [
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,

        MirapiSharedModule,
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule
{
}
