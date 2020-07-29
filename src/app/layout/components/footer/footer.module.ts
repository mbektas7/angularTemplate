import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { MirapiSharedModule } from '@mirapi/shared.module';

import { FooterComponent } from 'app/layout/components/footer/footer.component';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        MirapiSharedModule
    ],
    exports     : [
        FooterComponent
    ]
})
export class FooterModule
{
}
