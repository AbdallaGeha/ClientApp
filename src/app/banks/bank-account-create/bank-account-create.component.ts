import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountsService } from '../bank-accounts.service';
import { Router } from '@angular/router';
import { KeyValueDto } from 'src/app/model';
import { BanksService } from '../banks.service';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the creation of a new bank account
*/
@Component({
  selector: 'app-bank-account-create',
  templateUrl: './bank-account-create.component.html',
  styleUrls: ['./bank-account-create.component.css']
})
export class BankAccountCreateComponent  implements OnInit, OnDestroy {
  
  //List of banks fetched from the backend
  banks : KeyValueDto[] = [];
  
  //Form for creating new bank account
  form: FormGroup;

  constructor(
    private bankAccountsService: BankAccountsService,
    private banksService: BanksService,
    private fb: FormBuilder,
    private router : Router,
    public errorService: ErrorHandlingService) {

    }

  /**
   * Lifecycle hook: Initializes form and fetches all banks 
   * when component loads
  */    
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        accountName : ['', { validators : [Validators.required, Validators.maxLength(50)]}],
        accountNumber : ['', { validators : [Validators.required, Validators.maxLength(50)]}],
        bankId : ['', { validators : [Validators.required]}]
      }
    )

    this.fillBanks();
  }

  /**
   * Fetch all banks from the API
  */
  fillBanks(){
    this.banksService.getBanksKeyValue().subscribe(
      {
        next: result =>  this.banks = result,
        error: error => this.errorService.handleError(error)
      }    
    );
  }

  /**
   * Create a new bank account by sending data to the API
  */
  save(){
    let bankAccountCreationDto = this.form.value;
    this.bankAccountsService.create(bankAccountCreationDto).subscribe(
      {
        next: result => 
          {
            this.router.navigate(['/bankaccounts']);
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