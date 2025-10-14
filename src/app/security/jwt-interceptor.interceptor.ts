import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * This class is used to intercept Http request and add current token
 * to request header if the user is logged in
*/
@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authService.getToken();
    if (token){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    
    return next.handle(request);
  }
}
