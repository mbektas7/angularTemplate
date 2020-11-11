import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import { MirapiSearchBarModule, MirapiShortcutsModule } from '@mirapi/components';
import { MirapiSharedModule } from '@mirapi/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { AuthService } from 'app/shared/services/auth.service';


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
    providers:[],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
