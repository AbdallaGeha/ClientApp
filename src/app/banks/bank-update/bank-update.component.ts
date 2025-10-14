import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BanksService } from '../banks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the update of an existing bank
*/
@Component({
  selector: 'app-bank-update',
  templateUrl: './bank-update.component.html',
  styleUrls: ['./bank-update.component.css']
})
export class BankUpdateComponent  implements OnInit, OnDestroy {
  //Bank id to get from url
  id: number;
  //Form to edit bank
  form: FormGroup;
  
  constructor(private banksService: BanksService,
    private fb: FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    public errorService: ErrorHandlingService) {
    
  }
  
  /**
   * Lifecycle hook: Initializes form and fetches bank  
   * when component loads
  */   
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name : ['', { validators : [Validators.required, Validators.maxLength(50)]}]
      }
    )

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.fillForm();
    })
  }

  /**
   * Fetch bank from the API
  */    
  fillForm(){
    if (this.id){
      this.banksService.getForUpdate(this.id).subscribe(
        {
          next: res => {
            this.form.patchValue(res);
        },
        error: er => 
          {
            this.errorService.handleError(er);
          }
        }
      );
    }
  }

  /**
   * Update bank by sending data to the API
  */  
  save(){
    let bankUpdateDto = this.form.value;
    this.banksService.update(this.id,bankUpdateDto).subscribe(
      {
        next: result => 
        {
          this.router.navigate(['/banks']);
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