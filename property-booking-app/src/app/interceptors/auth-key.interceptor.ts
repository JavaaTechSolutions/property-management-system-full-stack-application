import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class authKeyInterceptor implements HttpInterceptor {

  constructor(private storageService: LocalStorageService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storageService.get('auth-key');

    console.log("Authentication key:"+token);

    if (token) {
      req = req.clone({
        url:  req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
