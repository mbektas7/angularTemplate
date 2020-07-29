import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';

import { MirapiProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        MirapiProgressBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports     : [
        MirapiProgressBarComponent
    ]
})
export class MirapiProgressBarModule
{
}
