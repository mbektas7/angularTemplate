import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { MirapiConfigService } from '@mirapi/services/config.service';
import { mirapiAnimations } from '@mirapi/animations';

import { AuthService } from 'app/shared/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { MirapiProgressBarService } from '@mirapi/components/progress-bar/progress-bar.service';
import { first } from 'rxjs/operators';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { MirapiNavigationService } from '@mirapi/components/navigation/navigation.service';


@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations : mirapiAnimations
})
export class LoginComponent implements OnInit
{


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


    //social login properties
    user: SocialUser;
    loggedIn: boolean;

    constructor(
        private authService: SocialAuthService,
        private _fuseConfigService: MirapiConfigService,
        private _formBuilder: FormBuilder,
        private authServiceLocal: AuthService,
        private alertifyService: AlertifyService,
        private router: Router,
        private domSanitizer: DomSanitizer,
        private progressBarService: MirapiProgressBarService,
        private _MirapiNavigationService : MirapiNavigationService
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

     
        if (this.authServiceLocal.loggedIn()) { 
            this._MirapiNavigationService.updateNavigationItem('admin', {
                hidden: false
            });
            this.router.navigateByUrl('/questions');
        }
        
        this.jwtHelper = new JwtHelperService();
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

       this.authServiceLocal.loginV2(this.loginUser,'')
       .subscribe(async data => {
           if (data){
               // Menüler açılır
               this._MirapiNavigationService.updateNavigationItem('admin', {
                hidden: false
            });
               const userToken: any = data["JwtToken"];
               const decodedToken = this.jwtHelper.decodeToken(userToken.toString());
               this.alertifyService.success('Sisteme giriş yapıldı');    
               const userName = decodedToken.sub;
               if (userName == null){
                 this.alertifyService.warning('Eksik Bilgilerinizi Lütfen Tamamlayınız.');
                 this.router.navigateByUrl('/profile');
               }
               else {
               this.router.navigateByUrl('/questions');
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

    signInWithGoogle(): void {
        // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        // this.authService.authState.subscribe(data=>{
        
        //     this.authServiceLocal.loginV3(data, '')
        //     .subscribe(async data => {
        //         if (data){
        //             this.authServiceLocal.saveToken(data["JwtToken"]);
        //             const userToken: any = data["JwtToken"];
        //             const decodedToken = this.jwtHelper.decodeToken(userToken.toString());
        //             this.alertifyService.success('Sisteme giriş yapıldı');    
        //             const userName = decodedToken.sub;
        //             if (userName == null){
        //               this.alertifyService.warning('Eksik Bilgilerinizi Lütfen Tamamlayınız.');
        //               this.router.navigateByUrl('/profile');
        //             }
        //             else {
        //             this.router.navigateByUrl('/questions');
        //         }
          
                
        //     }
        //       },
        //       error => {
        //         this.progressBarService.hide();
        //         if (error.status === 401){
        //             this.alertifyService.error('Kullanıcı adı yada şifre yanlış');
        //         }
        //         else {
        //             // this.reloadImage();
        //             this.alertifyService.error(error.error);
     
        //         }
        //         this.activeLoginButton();
        //     });   


        // });
      }
     
      signInWithFB(): void {
        // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        // this.authService.authState.subscribe(data=>{
        
        //     this.authServiceLocal.loginV3(data, '')
        //     .subscribe(async data => {
        //         if (data){
        //             this.authServiceLocal.saveToken(data["JwtToken"]);
        //             const userToken: any = data["JwtToken"];
        //             const decodedToken = this.jwtHelper.decodeToken(userToken.toString());
        //             this.alertifyService.success('Sisteme giriş yapıldı');    
        //             const userName = decodedToken.sub;
        //             if (userName == null){
        //               this.alertifyService.warning('Eksik Bilgilerinizi Lütfen Tamamlayınız.');
        //               this.router.navigateByUrl('/profile');
        //             }
        //             else {
        //             this.router.navigateByUrl('/questions');
        //         }
          
                
        //     }
        //       },
        //       error => {
        //         this.progressBarService.hide();
        //         if (error.status === 401){
        //             this.alertifyService.error('Kullanıcı adı yada şifre yanlış');
        //         }
        //         else {
        //             // this.reloadImage();
        //             this.alertifyService.error(error.error);
     
        //         }
        //         this.activeLoginButton();
        //     });   

        // });
      }

}

