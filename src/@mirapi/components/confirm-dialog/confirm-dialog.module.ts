import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { MirapiConfirmDialogComponent } from '@mirapi/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        MirapiConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        MirapiConfirmDialogComponent
    ],
})
export class MirapiConfirmDialogModule
{
}
