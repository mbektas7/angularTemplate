import { Injectable } from '@angular/core';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AlertifyService } from 'app/shared/services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( 
    private _httpClient : HttpRequestsService,
    private _alertifyService : AlertifyService) { }
}
