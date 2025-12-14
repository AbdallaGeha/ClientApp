import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountsService } from '../bank-accounts.service';
import { LookupService } from 'src/app/shared/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyValueDto } from 'src/app/model';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the update of an existing bank account
*/
@Component({
  selector: 'app-bank-account-update',
  templateUrl: './bank-account-update.component.html',
  styleUrls: ['./bank-account-update.component.css']
})
export class BankAccountUpdateComponent implements OnInit, OnDestroy {
  //Bank account id to get from url
  id: number;
  //Form to edit bank account
  form: FormGroup;
  //List of banks fetched from the backend
  banks : KeyValueDto[] = [];
  
  constructor(private bankAccountsService: BankAccountsService,
    private lookupService: LookupService,
    private fb: FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    public errorService: ErrorHandlingService
  ) {
    
  }
  
  /**
   * Lifecycle hook: Initializes form and fetches bank account 
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

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.fillForm();
    })
  }

  /**
   * Fetch all banks from the API
  */  
  fillBanks(){
    this.lookupService.getBanksKeyValue().subscribe(
      {
        next: res => {
          this.banks = res;
        },
        error: er => 
        {
            this.errorService.handleError(er);
        }
      }
    );
  }

  /**
   * Fetch bank account from the API
  */   
  fillForm(){
    if (this.id){
      this.bankAccountsService.getForUpdate(this.id).subscribe(
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
   * Update bank account by sending data to the API
  */  
  save(){
    let bankAccountUpdateDto = this.form.value;
    this.bankAccountsService.update(this.id,bankAccountUpdateDto).subscribe(
      {
        next: result => 
        {
          this.router.navigate(['/bankaccounts']);
        },
        error: er => 
        {
          this.errorService.handleError(er);
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
