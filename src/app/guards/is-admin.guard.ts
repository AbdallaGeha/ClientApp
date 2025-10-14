import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../security/auth.service';
import { Admin_Role } from './RolesConstants';

/**
 * IsAdminGuard prevents no admin users from accessing protected routes
 * If users are not logged in they are redirected to the login page.
 * If users are not admin users, they are redirected to unauthorized page
 */
@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  
  constructor(private authService : AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (!this.authService.isLoggedIn()){
        this.router.navigate(['/login']);
        return false;
      }

      if (!this.authService.isInRole(Admin_Role)){
        this.router.navigate(['/unauthorized']);
        return false;
      }
    
      return true;
  }
}
