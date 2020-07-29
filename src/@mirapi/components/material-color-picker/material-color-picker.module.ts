import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule } from '@angular/material';

import { MirapiPipesModule } from '@mirapi/pipes/pipes.module';

import { MirapiMaterialColorPickerComponent } from '@mirapi/components/material-color-picker/material-color-picker.component';

@NgModule({
    declarations: [
        MirapiMaterialColorPickerComponent
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,

        MirapiPipesModule
    ],
    exports: [
        MirapiMaterialColorPickerComponent
    ],
})
export class MirapiMaterialColorPickerModule
{
}
