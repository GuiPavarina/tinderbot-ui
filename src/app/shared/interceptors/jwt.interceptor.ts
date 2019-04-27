import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../api-boundle/services/auth.service';
import { User } from 'src/app/api-boundle/models/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser: User;
    this.authService.currentUserValue.subscribe(value => {
      currentUser = value;
    });
    if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${currentUser.accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
