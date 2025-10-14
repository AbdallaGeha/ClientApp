import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserRolesDto } from '../security.models';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component manages user roles by displaying user roles,
 add new role to user, remove existing role from user 
*/
@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit, OnDestroy {
  //List of all roles fetched from the API
  roles: string[];
  //User info and list of user roles
  userRoles: UserRolesDto;
  //Form for roles selection
  form: FormGroup;

  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public errorService: ErrorHandlingService
  ) {
  }

  /**
   * Lifecycle hook: Initializes form and fetch user roles and all roles
   * from Backend when component loads
  */   
  ngOnInit() {
    this.form = this.fb.group({
      role: ['', { validators : [Validators.required]}] 
    });

    this.activatedRoute.params.subscribe(params => {
      this.authService.getUserRoles(params['email']).subscribe({
        next: res => {
          this.userRoles = res;
        },
        error: er => {
          this.errorService.handleError(er);
        }
      });
    });

    this.authService.getRoles().subscribe({
      next: res => this.roles = res,
      error: er => {
        this.errorService.handleError(er);
      }
    });

  }

  /**
   * Add new role to user
  */    
  assignRole(){
    let roleToAssign = this.form.value.role;
    
    if (this.userRoles.roles.indexOf(roleToAssign) == -1)
    {
        this.authService
          .assignRole({ email : this.userRoles.user.email, role : roleToAssign})
          .subscribe({
            next: res => {
              this.userRoles.roles.push(roleToAssign);
            },
            error: er => {
              this.errorService.handleError(er);
            }
          });
    }
  }

  /**
   * Remove role from user
  */   
  removeRole(role: string){
    if (this.userRoles.roles.indexOf(role) !== -1)
    {
        this.authService
          .removeAssignedRole({ email : this.userRoles.user.email, role : role})
          .subscribe({
            next: res => {
              let index = this.userRoles.roles.indexOf(role); 
              this.userRoles.roles.splice(index, 1);
            },
            error: er => {
              this.errorService.handleError(er);
            }
          });
    }
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }

}
