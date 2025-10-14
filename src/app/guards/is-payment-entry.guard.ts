import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../security/auth.service';
import { Admin_Role, Payment_Entry_Role } from './RolesConstants';

/**
 * IsPaymentEntryGuard prevents users from accessing protected routes
 * If users are not logged in they are redirected to the login page.
 * If users are not admin users or not in Payment Entry Role they are 
 * redirected to unauthorized page
 */
@Injectable({
  providedIn: 'root'
})
export class IsPaymentEntryGuard implements CanActivate {

  constructor(private authService : AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (!this.authService.isLoggedIn()){
        this.router.navigate(['/login']);
        return false;
      }

      if (this.authService.isInRole(Admin_Role)){
        return true;
      }

      if (!this.authService.isInRole(Payment_Entry_Role)){
        this.router.navigate(['/unauthorized']);
        return false;
      }

      return true;
  }
  
}
