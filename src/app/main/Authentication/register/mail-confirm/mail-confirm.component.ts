import { Component, ViewEncapsulation } from '@angular/core';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { mirapiAnimations } from '@mirapi/animations';
import { MailConfirmService } from './mail-confirm.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector     : 'mail-confirm',
    templateUrl  : './mail-confirm.component.html',
    styleUrls    : ['./mail-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : mirapiAnimations
})
export class MailConfirmComponent
{
    private _unsubscribeAll: Subject<any>;
    isConfirmed : boolean;
    constructor(
        private _mirapiConfigService: MirapiConfigService,
        private _mailconfirmservice : MailConfirmService
    )
    {
        this.isConfirmed=false;
        // Configure the layout
        this._mirapiConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        this._unsubscribeAll = new Subject();
    }
    
   ngOnInit(): void
   {
    this._mailconfirmservice.onUserChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(isConfirm => {
            if(isConfirm==true)
            this.isConfirmed = isConfirm;
            else 
            this.isConfirmed = false;
    });

   }



}
