import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule
} from '@angular/material';

import { MirapiDirectivesModule } from '@mirapi/directives/directives';
import { MirapiMaterialColorPickerModule } from '@mirapi/components/material-color-picker/material-color-picker.module';
import { MirapiSidebarModule } from '@mirapi/components/sidebar/sidebar.module';

import { MirapiThemeOptionsComponent } from '@mirapi/components/theme-options/theme-options.component';

@NgModule({
    declarations: [
        MirapiThemeOptionsComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,

        MirapiDirectivesModule,
        MirapiMaterialColorPickerModule,
        MirapiSidebarModule
    ],
    exports     : [
        MirapiThemeOptionsComponent
    ]
})
export class MirapiThemeOptionsModule
{
}
