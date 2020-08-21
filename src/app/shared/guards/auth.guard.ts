import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate  {
      /**
       *
       */
      constructor(private http: HttpClient, private router: Router,private authService:AuthService) {
          
          
      }
      async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean>{
                  
          try {
              const result: any = await this.authService.isUserLoggedInWithoutRefreshing().toPromise(); 
              this.router.navigateByUrl('/dashboard')
              
         
          } catch (error) {
              return true;
          }
      
          
        
    
    
  }
    
  }
  
        
    