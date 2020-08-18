import { Injectable } from '@angular/core';
import { HttpRequestsService } from './httpRequests.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpRequestService: HttpRequestsService,
    private authService: AuthService) { }
  getUserRoles(userId){
   return this.httpRequestService.get('Users/' + userId + '/roles');
  }
  getUserClaims(userId){
   return this.httpRequestService.get('Users/' + userId + '/claims');
  }
  getCompaniesOfCurrentUser(){
      const userId = this.authService.getCurrentUserId();
      return this.httpRequestService.post('Users/' + userId + '/getUserCompanies', null);
  }


  async getUsersByIds(users: Array<string>){
      let result = await this.httpRequestService.getList('Users');
      result = result.filter((user) => users.includes(user.id));
      return result.map((user) => {
          return {id: user.id, name: user.name, surname: user.surname};
        });
  
    }
}
