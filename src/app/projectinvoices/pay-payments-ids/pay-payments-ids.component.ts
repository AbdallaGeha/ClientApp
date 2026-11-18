import { Component, OnDestroy, OnInit } from '@angular/core';
import {  ProjectInvoiceCash, ProjectInvoiceCheck, ProjectInvoiceGroupPaymentCreationDto, ProjectInvoicePaymentCreationDto, ProjectInvoicePaymentReadyToPayDto } from '../projectInvoices.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ProjectInvoicesService } from '../project-invoices.service';
import { PaymentIdsService } from '../payment-ids.service';
import { ErrorHandlingService } from 'src/app/error-handling.service';
import { LookupService } from 'src/app/shared/lookup.service';
import { KeyValueDto } from 'src/app/model';

/** 
 This component handles single or group of project invoice payments
 through a list of cash movements and a list of checks movements
*/
@Component({
  selector: 'app-pay-payments-ids',
  templateUrl: './pay-payments-ids.component.html',
  styleUrls: ['./pay-payments-ids.component.css']
})
export class PayPaymentsIdsComponent implements OnInit, OnDestroy{
  //List of project invoice payments fetched from the Backend
  payments : ProjectInvoicePaymentReadyToPayDto[] = [];
  //List of bank accounts used for checks fetched from the Backend
  bankAccounts : KeyValueDto[] = [];
  //Cash form used to add cash movement
  formCash : FormGroup | null;
  //Check form used to add check movement
  formCheck : FormGroup | null;

  //List of check movements to be populated from client input 
  projectInvoiceCheckList : ProjectInvoiceCheck[] = [];
  //List of cash movements to be populated from client input
  projectInvoiceCashList : ProjectInvoiceCash[] = [];

  isLoadingBankAccounts = false;
  
  constructor(
    private projectInvoiceService : ProjectInvoicesService,
    private lookupService : LookupService,
    private paymentIdsService: PaymentIdsService,
    private fb: FormBuilder,
    private router: Router,
    private errorService: ErrorHandlingService) {
  }

  /**
   * Lifecycle hook: fetch project invoice suggested payments by their ids
   * from the backend
  */    
  ngOnInit(): void {

    if (this.paymentIdsService.Ids.length === 0)
      this.router.navigate(['/error']);

    this.projectInvoiceService.getPaymentsToPayByIds(this.paymentIdsService.Ids).subscribe(
    {
      next: res => {
        if (res.length === 0) {
          this.router.navigate(['/error']);
          return;
        }
        this.payments = res;
      },
      error: er => this.errorService.handleError(er)
    });
  }

  /**
   * Fetch bank accounts from the API
  */  
  fillBankAccounts(){

    if (this.isLoadingBankAccounts)
      return;
    this.isLoadingBankAccounts = true;    

    this.lookupService.getBankAccountsKeyValue().subscribe(
      {
        next: res => 
        {
          this.bankAccounts = res;
          this.isLoadingBankAccounts = false;
        },
        error: er => {
          this.isLoadingBankAccounts = false;
          this.errorService.handleError(er);  
        }
      });
  }
  
  /**
   * Initialize check form
  */   
  addCheck(){
    if (this.bankAccounts.length === 0)
    {
      this.fillBankAccounts();
    }

    this.formCheck = this.fb.group({
      bankAccountId : ['', { validators : [Validators.required]}],
      date : ['', { validators : [Validators.required]}],
      amount : ['', { validators : [Validators.required]}],
      checkNumber : ['', { validators : [Validators.required]}]
    });
  }

  /**
   * Initialize cash form
  */  
  addCash(){
    this.formCash = this.fb.group({
      date : ['', { validators : [Validators.required]}],
      amount : ['', { validators : [Validators.required]}]
    });
  }

  /**
   * Remove cash form
  */   
  cancelCash(){
    this.formCash = null;
  }

  /**
   * Remove check form
  */  
  cancelCheck(){
    this.formCheck = null;
  }

  /**
   * Add entry to list of cash 
  */    
  addCashEntry(){
      if (!this.formCash || this.formCash.invalid)
        return;
      this.projectInvoiceCashList.push(this.formCash.value);
      this.cancelCash();
  }

  /**
   * Add entry to list of checks 
  */      
  addCheckEntry(){
    if (!this.formCheck || this.formCheck.invalid)
      return;

    const bankAccount = this.bankAccounts.find(x => x.key === this.formCheck!.value.bankAccountId)?.value;
    
    if (!bankAccount)
      return;

    this.projectInvoiceCheckList.push({
      date : this.formCheck.value.date,
      amount : this.formCheck.value.amount,
      bankAccount : bankAccount,
      checkNumber : this.formCheck.value.checkNumber
    });
    this.cancelCheck();
  }

  /**
   * Handle Pay transaction
  */    
pay() {
    
    if (!this.validateAmount()) {
      alert('Validation error');
      return;
    }

    const cashList = this.projectInvoiceCashList.map(x => ({
      date: x.date,
      amount: x.amount
    }));

    const checksList = this.projectInvoiceCheckList.map(x => ({
      date: x.date,
      amount: x.amount,
      bankAccountId: Number(
        this.bankAccounts.find(a => a.value === x.bankAccount)?.key
      ),
      checkNumber: x.checkNumber
    }));

    if (this.payments.length === 1) {

      const paymentDto: ProjectInvoicePaymentCreationDto = {
        paymentId: this.payments[0].id,
        CashList: cashList,
        checksList: checksList
      };

      this.projectInvoiceService.payment(paymentDto).subscribe({
        next: () => this.router.navigate(['/home']),
        error: er => this.errorService.handleError(er)
      });

    } else if (this.payments.length > 1) {

      const paymentGroupDto: ProjectInvoiceGroupPaymentCreationDto = {
        paymentIds: this.payments.map(x => x.id),
        CashList: cashList,
        checksList: checksList
      };

      this.projectInvoiceService.paymentGroup(paymentGroupDto).subscribe({
        next: () => this.router.navigate(['/home']),
        error: er => this.errorService.handleError(er)
      });
    }
}

  /**
   * Validate payment amount and paid amount
   * We validate this on the server again
   * We can use and end point to validate if we 
   * dont want to leak any logic.
  */    
  validateAmount(): boolean {
    let paymentAmount = 0;
    this.payments.forEach(x => {
      paymentAmount += x.amount;
    });

    let paidAmount = 0;
    this.projectInvoiceCashList.forEach(x => {
      paidAmount += x.amount;
    });
    this.projectInvoiceCheckList.forEach(x => {
      paidAmount += x.amount;
    });

    return paymentAmount > 0 &&
          paymentAmount.toFixed(2) === paidAmount.toFixed(2);
  }

  /**
   * Remove cash entry from the list of cash
  */    
  removeCash(index : number){
    this.projectInvoiceCashList.splice(index, 1);
  }

  /**
   * Remove check entry from the list of checks
  */   
  removeCheck(index : number){
    this.projectInvoiceCheckList.splice(index, 1);
  }
  
  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}
