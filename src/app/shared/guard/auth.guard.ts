import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../api-boundle/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser;
    this.authService.currentUserValue.subscribe(value => {
      currentUser = value;
    });
    if (currentUser != null) {
        return true;
    }

    this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
