import { Injectable } from '@angular/core';
import { UserLogin } from '../models/UserLogin';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { UserRegister} from '../models/UserRegister';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { environment } from 'environments/environment';
import { tap, share, map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

let jwtToken: string;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    jwtHelper = new JwtHelperService();


    private jwtTokenSubject: Subject<string>;
    constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
    private _progressBarService: FuseProgressBarService,
  ) {
    this.jwtTokenSubject = new Subject();
  }
 
    userToken: any;
    decodedToken: any;
    TOKEN_KEY = 'token';
    REFRESH_TOKEN_KEY = '625bc9db-b443-4af4-96b1-d5526487de36';
    userName: any;
    login(loginUser: UserLogin) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post(environment.rootPath + 'Token/' , loginUser, { headers: headers }).shareReplay();
  }
  loginV2(loginUser: UserLogin, captchaResponse) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post(`${environment.rootPath}Token`, loginUser, { headers: headers }).shareReplay();
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
    
   // await this.httpClient.get(environment.rootPath + `Token/logout`).toPromise();
    this.saveToken(null);
    this.deleteRefreshToken();

    this.router.navigateByUrl('/auth/login');

  }
    async logOutWithoutRouting(){
    await this.httpClient.get(environment.rootPath + `Token/logout`).toPromise();
    //this.deleteRefreshToken();
    //this.saveToken(null);
    }
    isTokenValid(){

      const isExpired =  this.jwtHelper.isTokenExpired(jwtToken);
      return !isExpired;
    }
    isUserLoggedIn(){
     return this.httpClient.post(environment.rootPath + `Token/isUserLoggedIn`, null); 
    }
    deleteRefreshToken(){
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
    isUserLoggedInWithoutRefreshing(){
    return this.httpClient.post(environment.rootPath + `Token/isUserLoggedInWithoutRefreshing`, null); 
    }
    getCurrentUserId(){
      console.log(jwtToken);
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
    const req  = this.httpClient.get(environment.rootPath + `Token/refresh`).do((res) => {
    if(res){
            this.saveToken(res[0]);
        }
    });
    return req;
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
