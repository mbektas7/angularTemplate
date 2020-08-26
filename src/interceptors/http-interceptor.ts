import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders
} from '@angular/common/http';
import { AuthService } from 'app/shared/services/auth.service';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { MirapiProgressBarService } from '@mirapi/components/progress-bar/progress-bar.service';
import { AlertifyService } from 'app/shared/services/alertify.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    // Refresh Token Subject tracks the current token, or is null if no token is currently
    // available (e.g. refresh pending).
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<
        any
    >(null);
    constructor(
        private authService: AuthService,
        private progressBar: MirapiProgressBarService,
        private alertifyService: AlertifyService
    ) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.progressBar.show();
        const token = this.authService.getToken();
        const headerSettings = {
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'   ,
            'If-Modified-Since': '0'     };
        if (token) {
            headerSettings['Authorization'] = `Bearer ${token}`;
        }
        headerSettings['X-Requested-With'] = 'XMLHttpRequest';
        const headers = new HttpHeaders(headerSettings);
        const newRequest = request.clone({
            headers,
            reportProgress: true
        });
        return next
            .handle(newRequest)
            .catch(error => {
                if (
                    request.url.includes('refresh-token') ||
                    request.url.includes('login') ||
                    request.url.includes('isUserLoggedInWithoutRefreshing') ||
                    request.url.includes('logout')
                ) {
                    if (request.url.includes('refresh-token')) {
                        console.log("cikis");
                        this.authService.logOut();
                    }

                    return Observable.throw(error);
                }
                if (error.status !== 401) {
                    return Observable.throw(error);
                }

                if (this.refreshTokenInProgress) {
                    return this.refreshTokenSubject
                        .filter(result => result !== null)
                        .take(1)
                        .switchMap(() =>
                            next.handle(this.addAuthenticationToken(request))
                        );
                } else {
                    this.refreshTokenInProgress = true;
                    this.refreshTokenSubject.next(null);
                    return this.authService.refreshToken()
                        .switchMap((res: any) => {
                            this.refreshTokenInProgress = false;
                            this.refreshTokenSubject.next(res[1]);
                            return next.handle(this.addAuthenticationToken(request));
                        })
                        .catch((err: any) => {
                            this.refreshTokenInProgress = false;
                            if (err.status === 401){
                                this.authService.logOut();
                            }
                            return Observable.throw(error);
                        });
                }
            })
            .finally(() => {
                this.progressBar.hide();
            });
    }

    addAuthenticationToken(request) {
        const token = this.authService.getToken();
        const headerSettings = {
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*'
        };
        if (token) {
            headerSettings['Authorization'] = `Bearer ${token}`;
            headerSettings['X-Requested-With'] = 'XMLHttpRequest';
            const headers = new HttpHeaders(headerSettings);
            const newRequest = request.clone({
                headers,
                reportProgress: true
            });

            return newRequest;
        } else {
            return request;
        }
    }
}
