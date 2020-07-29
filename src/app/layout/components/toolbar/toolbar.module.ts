import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import { MirapiSearchBarModule, MirapiShortcutsModule } from '@mirapi/components';
import { MirapiSharedModule } from '@mirapi/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,

        MirapiSharedModule,
        MirapiSearchBarModule,
        MirapiShortcutsModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
