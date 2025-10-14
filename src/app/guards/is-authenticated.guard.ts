import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../security/auth.service';

/**
 * IsAuthenticatedGuard prevents unauthenticated users from accessing 
 * protected routes, if users are not logged they are redirected to the 
 * login page.
 */
@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  
  constructor(private authService : AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (!this.authService.isLoggedIn()){
        this.router.navigate(['/login']);
        return false;
      }
    
      return true;
  }
  
}
