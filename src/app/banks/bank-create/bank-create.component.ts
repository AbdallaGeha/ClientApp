import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BanksService } from '../banks.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the creation of a new bank
*/
@Component({
  selector: 'app-bank-create',
  templateUrl: './bank-create.component.html',
  styleUrls: ['./bank-create.component.css']
})
export class BankCreateComponent implements OnInit, OnDestroy {

  //Form for creating new bank 
  form: FormGroup;
  
  constructor(private banksService: BanksService,
    private fb: FormBuilder,
    private router : Router,
    public errorService: ErrorHandlingService) {
    
  }
  
  /**
   * Lifecycle hook: Initializes form when component loads
  */
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name : ['', { validators : [Validators.required, Validators.maxLength(50)]}]
      }
    )
  }

  /**
   * Create a new bank by sending data to the API
  */
  save(){
    let bankCreationDto = this.form.value;
    this.banksService.create(bankCreationDto).subscribe(
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
