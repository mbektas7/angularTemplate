import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { mirapiAnimations } from '@mirapi/animations';

import { AuthService } from 'app/shared/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { Router } from '@angular/router';
import { PageClaims } from 'enums/pageTypes.enum';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { MirapiProgressBarService } from '@mirapi/components/progress-bar/progress-bar.service';
import { first } from 'rxjs/operators';

@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations : mirapiAnimations
})
export class LoginComponent implements OnInit
{

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * 
     * 
     */
    ;
    loginForm: FormGroup;
    userToken: any;
    isSubmitClicked = false;
    navigation: any = {};
    loginUser: any = {};
    captchaImage;
    captchaId = '';
    private jwtHelper: JwtHelperService

    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private _fuseConfigService: MirapiConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private alertifyService: AlertifyService,
        private router: Router,
        private domSanitizer: DomSanitizer,
        private progressBarService: MirapiProgressBarService,
    )
    {   
       
        // Configure the layout
        this._fuseConfigService.config = {
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
        if (this.authService.isTokenValid()){
            this.router.navigateByUrl('/dashboard');
        }
        this.jwtHelper = new JwtHelperService();
    }
    get isAuthenticated(){
         return this.authService.isTokenValid();

      }

    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            username   : ['', [Validators.required]],
            password: ['', Validators.required],
        });
    }
    login() {
        this.progressBarService.show();
       this.disableLoginButton();
       this.loginUser = Object.assign({}, this.loginForm.value);

       this.authService.loginV2(this.loginUser, '')
       .subscribe(async data => {
           if (data){
               this.authService.saveToken(data["JwtToken"]);
               const userToken: any = data["JwtToken"];
               const decodedToken = this.jwtHelper.decodeToken(userToken.toString());
               this.alertifyService.success('Sisteme giriş yapıldı');    
               const userName = decodedToken.sub;
               if (userName == null){
                 this.alertifyService.warning('Eksik Bilgilerinizi Lütfen Tamamlayınız.');
                 this.router.navigateByUrl('/profile');
               }
               else {
               this.router.navigateByUrl('/dashboard');
           }
     
           
       }
         },
         error => {
           this.progressBarService.hide();
           if (error.status === 401){
               this.alertifyService.error('Kullanıcı adı yada şifre yanlış');
           }
           else {
               // this.reloadImage();
               this.alertifyService.error(error.error);

           }
           this.activeLoginButton();
       });       

   
   }
    reloadImage() {
    }

    activeLoginButton(){
        this.isSubmitClicked = false;
    }
    disableLoginButton(){
        this.isSubmitClicked = true;
    }

}

