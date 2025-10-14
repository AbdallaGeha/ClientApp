import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegistrationRequestDto } from '../security.models';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles user registration
*/
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  //Form for registration
  formGroup: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService,
      private router: Router,
      public errorService: ErrorHandlingService) {
  }
  
  /**
   * Lifecycle hook: Initializes form when component loads
  */   
  ngOnInit() {
      this.formGroup = this.fb.group({
        email: ['', { validators : [Validators.required, Validators.email]}],
        name: ['', { validators : [Validators.required]}],
        phonenumber: ['', { validators : [Validators.required, Validators.pattern(/^[0-9]\d*$/)]}],
        password: ['', { validators : [Validators.required]}],
        confirmpassword: ['', { validators : [Validators.required]}] 
      },{
        validators: this.matchValidator('password', 'confirmpassword')
      });
  }

  //Custom validator for password confirmation
  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
          const error = { confirmedValidator: 'Passwords do not match.' };
          matchingControl!.setErrors(error);
          return error;
        } else {
          matchingControl!.setErrors(null);
          return null;
        }
    }
  }

  /**
   * Handles user registration by sending info and to the API
  */  
  register(){
    const registerDto : RegistrationRequestDto = {
      email: this.formGroup.value.email,
      name: this.formGroup.value.name,
      phonenumber: this.formGroup.value.phonenumber,
      password: this.formGroup.value.password
    }
    this.authService.register(registerDto).subscribe({
      next: res => {
          this.router.navigate(['/login']);
      },
      error: er => { this.errorService.handleError(er); }
    }); 
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}
