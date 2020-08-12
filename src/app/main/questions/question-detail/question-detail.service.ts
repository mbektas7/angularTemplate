import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { HttpClient } from '@angular/common/http';
import { PostModel } from 'app/main/admin/posts/PostModel';

@Injectable()
export class QuestionDetailService   implements Resolve<any>{


  routeParams: any;
  post: PostModel[];
  onPostChanged: BehaviorSubject<any>;

  constructor(
      private _httpClient: HttpRequestsService,
      private http: HttpClient,
      private router: Router,
  )
  {
    
      this.onPostChanged = new BehaviorSubject({});
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {
        Promise.all([this.getPost()]).then(() => {
            resolve();
        }, reject);
    });
}



getPost(): Promise<any> {
  return new Promise((resolve, reject) => {
      this._httpClient
          .get('post/' + this.routeParams.id)
          .subscribe((response: any) => {
              this.post = response;
              this.onPostChanged.next(this.post);
              resolve(response);
          }, reject);
  });
}

}
