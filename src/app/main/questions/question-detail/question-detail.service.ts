import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { HttpClient } from '@angular/common/http';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { SaveAnswer } from 'app/main/admin/posts/saveAnswer';

@Injectable()
export class QuestionDetailService   implements Resolve<any>{


  routeParams: any;
  post: PostModel[];
  images: any[];
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
              this.post = response["data"];
              this.onPostChanged.next(this.post);
              resolve(response["data"]);
          }, reject);
  });
}

getPostImages(): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient
            .get('post/getPostImages/' + this.routeParams.id)
            .subscribe((response: any) => {
                this.images = response["data"];
                resolve(response["data"]);
            }, reject);
    });
  }

addAnswer(data : SaveAnswer): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient
            .post('post/addAnswer',data)
            .subscribe((response: any) => {
                this.getPost();
                resolve(response["data"]);
            }, reject);
    });
  }

}
