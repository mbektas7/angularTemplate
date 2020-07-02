import { Injectable } from '@angular/core';
import { HttpRequestsService } from './httpRequests.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(private httpClient: HttpRequestsService) {}
  public getClaimsOfRole(roleId){
    return this.httpClient.getList('roles/' + roleId + '/claims');  
}
  
}
