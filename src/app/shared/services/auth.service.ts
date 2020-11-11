import { Injectable } from "@angular/core";
import { UserLogin } from "../models/UserLogin";
import { HttpHeaders, HttpClient, HttpInterceptor } from "@angular/common/http";
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { UserRegister } from "../models/UserRegister";
import { MirapiProgressBarService } from "@mirapi/components/progress-bar/progress-bar.service";
import { environment } from "environments/environment";
import { tap, share, map, catchError, distinctUntilChanged } from "rxjs/operators";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { SocialUser } from 'angularx-social-login';

import { User } from 'app/main/profile/user';
import { UserDTO } from '../models/UserDTO';
import { HttpRequestsService } from './httpRequests.service';


let jwtToken: string;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   

    jwtHelper = new JwtHelper();
    jwtTokenSubject: Subject<string>;
   
    
    userToken: any;
    decodedToken: any;
    TOKEN_KEY = 'token';
    REFRESH_TOKEN_KEY = '625bc9db-b443-4af4-96b1-d5526487de36';
    userName: any;
    userProfileImage : string;

   
    constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
    private _progressBarService: MirapiProgressBarService,
  ) {
    this.jwtHelper = new JwtHelper()
    this.jwtTokenSubject = new Subject();
   
    
  }


 

  loginV2(loginUser: UserLogin, captchaResponse) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post(`${environment.rootPath}Token`, loginUser, { headers: headers }).do(user=> {
     
      this.saveToken(user["JwtToken"]);
     console.log("login");
      return user;
    });
    
  }

  loginV3(login:SocialUser, captchaResponse) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post(`${environment.rootPath}Users/socialLoginControl`, login, { headers: headers }).shareReplay();
  }


  register(registerUser: UserRegister) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers = headers.append('Accept', 'application/json');
    return this.httpClient.post(environment.rootPath + 'Users', registerUser, { headers: headers });
  }
  saveToken(token) {
   jwtToken = token;
   this.jwtTokenSubject.next(jwtToken);
  
  }


  async logOut(){
    
    await this.httpClient.get(environment.rootPath + `Token/logout`).toPromise();
    this.saveToken(null);
    this.deleteRefreshToken();
  
    this.router.navigateByUrl('/auth/login');

  }
    async logOutWithoutRouting(){
    await this.httpClient.get(environment.rootPath + `Token/logout`).toPromise();
    this.deleteRefreshToken();
    this.saveToken(null);
    }


    isTokenValid(){

      const isExpired =  this.jwtHelper.isTokenExpired(jwtToken);
      return !isExpired;
    }


    loggedIn(){
      return tokenNotExpired(this.TOKEN_KEY, jwtToken);
    }

    deleteRefreshToken(){
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
    isUserLoggedInWithoutRefreshing(){
    return this.httpClient.post(environment.rootPath + `Token/isUserLoggedInWithoutRefreshing`, null); 
    }
    getCurrentUserId(){
    if (jwtToken) {
       return this.jwtHelper.decodeToken(jwtToken).userid;
    }
    return null;
  }

  getClaimsFromToken(){
    if (jwtToken){
      return this.jwtHelper.decodeToken(jwtToken).claims;
    }
    return null;
  }

  getCurrentUserName(){
       return this.jwtHelper.decodeToken(jwtToken).sub; 
  }

  getCurrentUserEmail(){
    if (jwtToken) {
        return this.jwtHelper.decodeToken(jwtToken).email;
    }
    return null;
  }
  refreshToken() {
   
    const url = environment.rootPath + '/Token';
    const req  = this.httpClient.post(environment.rootPath + `Token/refresh-token`,{}).do((res) => {
    if(res){
      this.saveToken(res["JwtToken"]);
      
        }
    });
    return req;
  }

getRefreshToken() {
  if ((document.cookie.split(';').find(x => x.includes('refreshToken')) || '=').split('=')[1] !=null) {
     this.httpClient.post(environment.rootPath + `Token/refresh-token`,{}).subscribe(data=>{
    this.saveToken(data["JwtToken"]);
   
  });
  return (document.cookie.split(';').find(x => x.includes('refreshToken')) || '=').split('=')[1];
  } else {
    return "";
  }
  // get refresh token from cookie
 
   
}


  getToken(){
      return jwtToken;
  }
  getPageTypes(){
      return this.jwtHelper.decodeToken(jwtToken).pageTypes;
  }
  getTokenObservable(){
    this.jwtTokenSubject.next(jwtToken);
    return this.jwtTokenSubject.asObservable();
  }




}
