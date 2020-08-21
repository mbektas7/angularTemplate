import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'app/shared/services/auth.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    constructor(private autService : AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.autService.getToken()
        const headerSettings = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
            'Access-Control-Allow-Origin': 'http://localhost',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers':' Origin, Content-Type, X-Auth-Token',
            'If-Modified-Since': '0'  ,
            'Authorization': 'Bearer '+token  };

            const headers = new HttpHeaders(headerSettings);
        request = request.clone({
           headers : headers,
            withCredentials: true
        });

        return next.handle(request);
    }
}