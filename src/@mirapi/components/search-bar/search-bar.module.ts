import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { MirapiSearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        MirapiSearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        MirapiSearchBarComponent
    ]
})
export class MirapiSearchBarModule
{
}
