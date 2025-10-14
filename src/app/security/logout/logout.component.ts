import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

/** 
 This component handles user logout
*/
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout();
    this.router.navigate(['/login']);
    
  }
}
