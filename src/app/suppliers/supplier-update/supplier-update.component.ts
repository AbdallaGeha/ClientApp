import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliersService } from '../suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the update of an existing supplier
*/
@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrls: ['./supplier-update.component.css']
})
export class SupplierUpdateComponent implements OnInit, OnDestroy {
  //Supplier id to get from url
  id: number;
  //Form to edit supplier
  form: FormGroup;
  
  constructor(private suppliersService: SuppliersService,
    private fb: FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    public errorService: ErrorHandlingService) {
    
  }
  
  /**
   * Lifecycle hook: Initializes form and fetches supplier  
   * when component loads
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

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.fillForm();
    })
  }

  /**
   * Fetch supplier from the API
  */   
  fillForm(){
    if (this.id){
      this.suppliersService.getForUpdate(this.id).subscribe(
        {
          next: res => {
            this.form.patchValue(res);
        },
        error: error => {
          this.errorService.handleError(error); 
        }
        }
      );
    }
  }

  /**
   * Update supplier by sending data to the API
  */   
  save(){
    let supplierUpdateDto = this.form.value;
    this.suppliersService.update(this.id,supplierUpdateDto).subscribe(
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
