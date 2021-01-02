import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { mirapiAnimations } from '@mirapi/animations';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { Router } from '@angular/router';

@Component({
    selector     : 'forgot-password',
    templateUrl  : './forgot-password.component.html',
    styleUrls    : ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : mirapiAnimations
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;
    isSubmitClicked = false;
    user: any = {}; 
     
    constructor(
        private _mirapiConfigService: MirapiConfigService,
        private _formBuilder: FormBuilder,
        private _httpService: HttpRequestsService,
        private _alertify: AlertifyService,
        private router:Router
    )
    {
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void 
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }



    sendMailtoPasswordRecovery() {
   
        this.user = Object.assign({}, this.forgotPasswordForm.value);
        this.isSubmitClicked = true;
        if (this.user.email) {
            const data = {
                email: this.user.email
            };
    
            this._httpService.post('Users/forgotpassword', data).subscribe(data => {
    
                this._alertify.success('Lütfen mail adresinize gönderilen bağlantıya tıklayınız.');
                this.router.navigateByUrl('/auth/login');
                
            },
            error => {
                this._alertify.error('Hata oluştu. \n' + error.error);
                this.isSubmitClicked = false;
              } 
            
            );
        } else {
            this._alertify.error('Email boş olamaz\n');
        }
       
     
    }



}
