import { ErrorHandler, Injectable} from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class GlobalErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error) {
     // IMPORTANT: Rethrow the error otherwise it gets swallowed
     console.error(error);
     throw error;
  }
  
}