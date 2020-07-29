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


    getList(path):Promise<any>{

      return new Promise((resolve,reject)=>{
    
          this._httpClient.get(path).subscribe((response:any)=>{
              resolve(response['data']);
          });
      });
    }
    
    
    addItem(path,contactType):Promise<any>{
    
      return new Promise((resolve,reject)=>{
    
          this._httpClient.post(path,contactType).subscribe((response:any)=>{
              resolve(response['data']);
              this._alertifyService.success('İşlem Başarılı.');
          },
          error => {
            this._alertifyService.error('İşlem Sırasında Hata luştu.');
          });
      });
    }
    
    updateData(path,contactType):Promise<any>{
    
      return new Promise((resolve,reject)=>{
          let data={name:contactType.name,url:contactType.url};
          this._httpClient.put(path+contactType.id,data).subscribe((response:any)=>{
              resolve(response['data']);
              this._alertifyService.success('İşlem başarılı.');
          },
          error => {
            this._alertifyService.error('İşlem sırasında hata oluştu.');
          }
          );
      });
    }
    
    updateDataShift(path,shift):Promise<any>{
    
      return new Promise((resolve,reject)=>{
          this._httpClient.put(path+shift.id,shift).subscribe((response:any)=>{
              resolve(response['data']);
              this._alertifyService.success('İşlem başarılı.');
          },
          error => {
            this._alertifyService.error('İşlem sırasında hata oluştu.');
          }
          );
      });
    }
    
    deleteData(path,id):Promise<any>{
    
      return new Promise((resolve,reject)=>{
    
          this._httpClient.delete(path,id).subscribe((response:any)=>{
              resolve(response['data']);
              this._alertifyService.success('İşlem başarılı.');
          },
          error => {
            this._alertifyService.error('İşlem sırasında hata oluştu.');
          });
      });
    }
}
