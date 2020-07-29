import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector   : 'mirapi-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class MirapiConfirmDialogComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MirapiConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<MirapiConfirmDialogComponent>
    )
    {
    }

}
