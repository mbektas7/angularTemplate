import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { mirapiAnimations } from '@mirapi/animations';
import { AuthService } from 'app/shared/services/auth.service';
import { InviteRegisterService } from '../invitedRegister/inviteRegister.service';
import { Router } from '@angular/router';
import { UserRegister } from 'app/shared/models/UserRegister';
import { MirapiProgressBarService } from '@mirapi/components/progress-bar/progress-bar.service';
import { AlertifyService } from 'app/shared/services/alertify.service';

@Component({
    selector   : 'register',
    templateUrl: './register.component.html',
    styleUrls  : ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations : mirapiAnimations
})
export class RegisterComponent implements OnInit, OnDestroy
{
    registerFormEmployee: FormGroup;
    code: string;
    userRegister = new UserRegister();
    isSubmitClicked = false;
    isDavetiyeAktifEtClicked = false;
    // Private
    private _unsubscribeAll: Subject<any>;
    
    constructor(
        private _mirapiConfigService: MirapiConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private inviteService: InviteRegisterService,
        private router: Router,
        private mirapiProgressBar: MirapiProgressBarService,
        private alertifyService:AlertifyService
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      
        this.registerFormEmployee = this._formBuilder.group({

            davetkodu : ['', Validators.required]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
      
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


 register(form: HTMLFormElement) {
    this.mirapiProgressBar.show();
    this.isSubmitClicked = true;
    this.authService.register(this.userRegister)
    .subscribe(data => {   
        this.alertifyService.success('Hesabınız başarıyla oluşturuldu.');
        this.router.navigateByUrl('/auth/login');  
        //this.router.navigateByUrl('/auth/register/mail-confirm');  
      },
       error => {
        this.alertifyService.error('Kayıt işlemi sırasında hata oluştu. \n' + error.error);
        this.isSubmitClicked = false;
        this.mirapiProgressBar.hide();
    });
  }

  registerEmployee(){
    const data = Object.assign({}, this.registerFormEmployee.value);
    this.isDavetiyeAktifEtClicked = true;
    this.inviteService.verifyCode(data.davetkodu).then( data => {
        if(data === null){
            this.isDavetiyeAktifEtClicked = false;
        }
        else {
        const davetkodu = data.userId;
            this.router.navigateByUrl('/auth/invited/' + davetkodu);
        }
      

    });

  }
}
