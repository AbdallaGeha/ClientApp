import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../security/auth.service';
import { Admin_Role, Invoice_Entry_Role } from './RolesConstants';

/**
 * IsInvoiceEntryGuard prevents users from accessing protected routes
 * If users are not logged in they are redirected to the login page.
 * If users are not admin users or not in Invoice Entry Role they are redirected 
 * to unauthorized page
 */
@Injectable({
  providedIn: 'root'
})
export class IsInvoiceEntryGuard implements CanActivate {

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

      if (!this.authService.isInRole(Invoice_Entry_Role)){
        this.router.navigate(['/unauthorized']);
        return false;
      }
    
      return true;
  }
  
}
