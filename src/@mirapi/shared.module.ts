import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MirapiDirectivesModule } from '@mirapi/directives/directives';
import { MirapiPipesModule } from '@mirapi/pipes/pipes.module';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MirapiDirectivesModule,
        MirapiPipesModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MirapiDirectivesModule,
        MirapiPipesModule
    ]
})
export class MirapiSharedModule
{
}
