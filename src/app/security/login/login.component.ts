import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginResponseDto } from '../security.models';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles user login
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  //Form for user credentials
  formGroup: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router,
    public errorService: ErrorHandlingService
  ) {
  }

  /**
   * Lifecycle hook: Initializes form when component loads
  */  
  ngOnInit() {
    this.formGroup = this.fb.group({
      username: ['', { validators : [Validators.required]}],
      password: ['', { validators : [Validators.required]}]
    });
  }

  /**
   * Handles user login by sending credentials and to the API
   * and saving token if succeed
  */  
  login(){
    this.authService.login(this.formGroup.value).subscribe({
      next: res => {
          this.authService.saveToken(res);
          this.router.navigate(['/home']);
      },
      error: er => { this.errorService.handleError(er);  }
    });
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}
