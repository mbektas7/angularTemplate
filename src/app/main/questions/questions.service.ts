import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot,   Resolve,    RouterStateSnapshot,    Router} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';
import { AlertifyService } from 'app/shared/services/alertify.service';

import { PostModel } from '../admin/posts/PostModel';


@Injectable()
export class QuestionsService implements Resolve<any> {

  questionList: any[];
  onQuestionsChanged: BehaviorSubject<any>;


  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
      private _httpClient: HttpRequestsService,
      private http: HttpClient
  )
  {
      // Set the defaults
      this.onQuestionsChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise((resolve, reject) => {

          Promise.all([
              this.getQuestions()
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }

  /**
   * Get companies
   *
   * @returns {Promise<any>}
   */
  getQuestions(): Promise<any>
  {
      //istek başarılı ise resolve metodu çağrılır.
      // istek başarısız ise reject metodu çağrılır.
      return  new Promise((resolve, reject) => {
         this._httpClient.get('post').subscribe((response: any) => {
             this.questionList = response.data;
             this.onQuestionsChanged.next(this.questionList);
             resolve(response.data);
         }, reject);
     });

  }



}
