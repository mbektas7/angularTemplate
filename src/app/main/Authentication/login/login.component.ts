import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { AuthService } from 'app/shared/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { Router } from '@angular/router';
import { PageClaims } from 'enums/pageTypes.enum';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations : fuseAnimations
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

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private alertifyService: AlertifyService,
        private router: Router,
        private domSanitizer: DomSanitizer,
        private progressBarService: FuseProgressBarService,

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
            this.router.navigateByUrl('/apps/dashboard');
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
                this.authService.saveToken(data[0]);
                const userToken: any = data;
                const decodedToken = this.jwtHelper.decodeToken(userToken.toString());
                this.alertifyService.success('Sisteme giriş yapıldı');    
                const userName = decodedToken.sub;
                if (userName == null){
                  this.alertifyService.warning('Eksik Bilgilerinizi Lütfen Tamamlayınız.');
                  this.router.navigateByUrl('/profile');
                }
                else {
                this.router.navigateByUrl('/apps/dashboard');
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
    private  removeUnauthorizedUrlsFromNavigation(array: any[]) {
        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            if (value.url) {
                const result: any = this.isPageTypeAuthenticated(value.pageType);
                if (result === false) {
                    array[i] = null;
                }
            } else if (value.children) {
                value.children =  this.removeUnauthorizedUrlsFromNavigation(
                    value.children
                );
                if (!value.url && value.children.length === 0) {
                    array[i] = null;
                }
            }
        }
        return array.filter(a => a);
    }
    
    isPageTypeAuthenticated(pageType: any): any {
        const pageTypes: string = this.authService.getPageTypes();
        if (pageType === PageClaims.dashboard) {
            return true;
        }
        let isAuthenticated = false;
        const pageTypesArray = pageTypes.split('-');

        for (let i = 0; i < pageTypesArray.length; i++) {
            const element = pageTypesArray[i];
            if (element === pageType) {
                isAuthenticated = true;
                break;
            }

        }
        return  isAuthenticated;
    }

    private setImagePathFromBase64(base64: string){
        const sonuc = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + base64);
        this.captchaImage = sonuc;
    }
}

