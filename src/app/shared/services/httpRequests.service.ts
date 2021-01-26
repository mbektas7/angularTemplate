import { Injectable, Injector } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {


  headers: any;
  tokenValue: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
    private injector: Injector
  ) {

  }


  getHeaders() {


    this.tokenValue = 'Bearer ' ;

    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'withCredentials ' : true,
      'Authorization': this.tokenValue
    };

    return this.headers;
  }

  post(path: string, data: any): Observable<any[]> {

    return this.httpClient
      .post<any[]>(environment.rootPath + path, data);
  }

  put(path: string, data: any): Observable<any[]> {

    return this.httpClient
      .put<any[]>(environment.rootPath + path, data);
  }


  delete(path: string, id: string): Observable<any[]> {
    return this.httpClient
      .delete<any[]>(environment.rootPath + path + id);
  }
  deleteWithoutId(path: string, data){
      const options = {
          headers: this.getHeaders(),
          body: data
      };
      return this.httpClient.delete(environment.rootPath + path, options);

  }

  postEski(data: any, path: string) {

    this.httpClient
      .post(environment.rootPath + path, data,)
      .subscribe(data => {
      },
        error => {
            
          this.alertifyService.error('Kayıt işlemi sırasında hata oluştu. \n' + error.error);
        });
  }


  getById(path: string, id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.rootPath + path + id);
  }

  get(path: string): Observable<any[]> {
    return this.httpClient
      .get<any[]>(environment.rootPath + path)
      .map((response: any[]) => {
        return <any[]>response;
      })
      .catch(this.aaa);
  }

  getNew(path:string){
    return new Promise((resolve, reject) => {

        this.httpClient.get(environment.rootPath + path, {headers: this.getHeaders()}).subscribe((response: any) => {
            resolve(response['data']);
          }, error => {
              
              reject(error);
          });
        });
  }
  getJwtToken(path:string){
    return new Promise((resolve, reject) => {

        this.httpClient.get(environment.rootPath + path, {headers: this.getHeaders()}).subscribe((response: any) => {
            resolve(response['JwtToken']);
          }, error => {
              
              reject(error);
          });
        });
  }

  aaa(error: Response) {

    if (error.status === 401) {
    } else {

    }
    return Observable.throw(error.status);

  }

  getList(path): Promise<any> {

    return new Promise((resolve, reject) => {

    this.get(path).subscribe((response: any) => {
        resolve(response['data']);
      }, error => {
          reject(error);
      });
    });
  }


  PostThenGet(path: string, data: any): Promise<any[]> {

    return new Promise((resolve, reject) => {

      this.post(path, data).subscribe((response: any) => {
        resolve(response['data']);
      });
    });
  }


  addItem(path, contactType): Promise<any> {

    return new Promise((resolve, reject) => {

      this.post(path, contactType).subscribe((response: any) => {
        resolve(response['data']);
       
      },
        error => {
          if (error.status == 401) {
            this.yetkisizIslem('Bu işlemi yapmak için yetkiniz bulunmamaktadır.');
          }
          else {
            this.alertifyService.error('İşlem Sırasında Hata oluştu.');
          }
        });
    });
  }

  updateData(path, data): Promise<any>{
    return new Promise((resolve, reject) => {
      this.put(path + data.id, data).subscribe((response: any) => {
        resolve(response['data']);
      
      },
        error => {
          this.alertifyService.error('İşlem sırasında hata oluştu.');
        }
      );
    });
  }
  updateDataIdsiz(path, data): Promise<any>{
    return new Promise((resolve, reject) => {
      this.put(path, data).subscribe((response: any) => {
        resolve(response['data']);
      },
        error => {
          this.alertifyService.error('İşlem sırasında hata oluştu.');
        }
      );
    });
  }
  deleteData(path, id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.delete(path, id).subscribe((response: any) => {
        resolve(response['data']);
      },
        error => {
          this.alertifyService.error('İşlem sırasında hata oluştu.');
        });
    });
  }
  yetkisizIslem(message: string) {

    this.alertifyService.error(message);
  }


}
