import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { HttpClient } from '@angular/common/http';
import { SaveAnswer } from 'app/main/admin/posts/saveAnswer';
import { BlogModel } from 'app/shared/models/BlogModel';
import { PostModel } from '../admin/posts/PostModel';
import { IkinciElModel } from 'app/shared/models/IkinciElModel';


@Injectable({
  providedIn: 'root'
})
export class IkincielService  implements Resolve<any> {


  routeParams: any;
  post: IkinciElModel[];
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
        Promise.all([this.getProduct()]).then(() => {
            resolve();
        }, reject);
    });
}



getProduct(): Promise<any> {
  return new Promise((resolve, reject) => {
      this._httpClient
          .get('product/' + this.routeParams.id)
          .subscribe((response: any) => {
              this.post = response["data"];
              this.onPostChanged.next(this.post);
              resolve(response["data"]);
          }, reject);
  });
}


addAnswer(data : SaveAnswer): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient
            .post('product/addAnswer',data)
            .subscribe((response: any) => {
                this.getProduct();
                resolve(response["data"]);
            }, reject);
    });
  }


  deleteProduct(data:PostModel): Promise<any>
  {

   return  new Promise((resolve, reject) => {
       this._httpClient.delete('product/',data.Id).subscribe((response:any) => {
           resolve(response["data"]);
       },reject)
   });
   }

   getProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient
            .get('products/')
            .subscribe((response: any) => {
                this.post = response["data"];
                resolve(response["data"]);
            }, reject);
    });
  }


  deleteAnsver(id : string): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient
            .delete('product/answer/',id)
            .subscribe((response: any) => {
                this.getProduct();
                resolve(response["data"]);
            }, reject);
    });
  }


}
