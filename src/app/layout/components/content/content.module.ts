import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MirapiSharedModule } from '@mirapi/shared.module';

import { ContentComponent } from 'app/layout/components/content/content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        MirapiSharedModule
    ],
    exports     : [
        ContentComponent
    ]
})
export class ContentModule
{
}
