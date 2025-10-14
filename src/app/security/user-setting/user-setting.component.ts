import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ChangePasswordDto, UserDto, UserUpdateDto } from '../security.models';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component allows user to edit user info and change password 
*/
@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit, OnDestroy {
  //User name extracted from jwt token
  userName: string;
  //User info fetched from the API
  userDto: UserDto;
  //Form for user info
  formUserInfo: FormGroup;
  //Form for changing password
  formChangePassword: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
        private router: Router,
        public errorService: ErrorHandlingService) {
  }

  /**
   * Lifecycle hook: Initializes user info form and password form,
   * fetch user info from Backend when component loads
  */     
  ngOnInit() {
    this.formUserInfo = this.fb.group({
      name: ['', { validators : [Validators.required]}],
      phoneNumber: ['', { validators : [Validators.required, Validators.pattern(/^[0-9]\d*$/)]}]
    });

    this.formChangePassword = this.fb.group({
      oldPassword: ['', { validators : [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{6,}$/)]}],
      newPassword: ['', { validators : [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{6,}$/)]}],
      newPasswordConfirm: ['', { validators : [Validators.required]}]
    },{
      validators: this.matchValidator('newPassword', 'newPasswordConfirm')
    });

    this.userName = this.authService.getUserNameFromToken();
    if (this.userName){
      this.authService.getUserByEmail(this.userName).subscribe({
        next: res => { 
          this.userDto = res;
          this.fillForm(); 
        },
        error: er => { this.errorService.handleError(er); }
      })
    }
  }

  /**
   * Read user info
  */    
  fillForm(){
    this.formUserInfo.patchValue(this.userDto);
  }

  /**
   * Update user info
  */   
  save(){
    let userUpdateDto : UserUpdateDto = {
      name: this.formUserInfo.value.name,
      phoneNumber: this.formUserInfo.value.phoneNumber
    };

    this.authService.updateUser(this.userName, userUpdateDto).subscribe({
      next: res => {
        this.router.navigate(['/home']);
      },
      error: er => { this.errorService.handleError(er); }
    })
  }

  /**
   * Update user password
  */   
  changePassword(){
    let dto : ChangePasswordDto = {
      userName: this.userName,
      oldPassword: this.formChangePassword.value.oldPassword,
      newPassword: this.formChangePassword.value.newPassword
    }

    this.authService.changePassword(dto).subscribe({
      next: res => { 
        this.router.navigate(['/logout'])
      },
      error: er => { this.errorService.handleError(er); }
    });
  }

  /**
   * Custom validator for password confirmation
  */    
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
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  

}
