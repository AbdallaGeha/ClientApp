import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliersService } from '../suppliers.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the creation of a new supplier
*/
@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent  implements OnInit, OnDestroy {

  //Form for creating new supplier 
  form: FormGroup;
  
  constructor(private suppliersService: SuppliersService,
    private fb: FormBuilder,
    private router : Router,
    public errorService: ErrorHandlingService  ) {
    
  }
  
  /**
   * Lifecycle hook: Initializes form when component loads
  */  
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name : ['', { validators : [Validators.required, Validators.maxLength(50)]}],
        phone : [null, { validators : [Validators.maxLength(50)]}],
        email : [null, { validators : [Validators.maxLength(50), Validators.email]}],
        address : [null, { validators : [Validators.maxLength(50)]}]
      }
    )
  }

  /**
   * Create a new supplier by sending data to the API
  */  
  save(){
    let supplierCreationDto = this.form.value;
    this.suppliersService.create(supplierCreationDto).subscribe(
      {
        next: result => 
          {
            this.router.navigate(['/suppliers']);
          },
          error: error => 
          {
            this.errorService.handleError(error); 
          }
      }
    )
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}
