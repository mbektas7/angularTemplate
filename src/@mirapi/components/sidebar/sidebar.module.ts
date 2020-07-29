import { NgModule } from '@angular/core';

import { MirapiSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        MirapiSidebarComponent
    ],
    exports     : [
        MirapiSidebarComponent
    ]
})
export class MirapiSidebarModule
{
}
