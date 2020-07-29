import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule, MatListModule } from '@angular/material';

import { MirapiDemoContentComponent } from './demo-content/demo-content.component';
import { MirapiDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';

@NgModule({
    declarations: [
        MirapiDemoContentComponent,
        MirapiDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        MirapiDemoContentComponent,
        MirapiDemoSidebarComponent
    ]
})
export class MirapiDemoModule
{
}
