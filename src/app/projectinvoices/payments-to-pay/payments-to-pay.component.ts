import { Component, OnDestroy, OnInit } from '@angular/core';


import { PaymentIdsService } from '../payment-ids.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectInvoicesService } from '../project-invoices.service';
import { ProjectInvoicePaymentReadyToPayDto } from '../projectInvoices.model';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component displays a list of project invoice suggested payments 
 for the user to select one or a set of payments to proceed 
*/
@Component({
  selector: 'app-payments-to-pay',
  templateUrl: './payments-to-pay.component.html',
  styleUrls: ['./payments-to-pay.component.css']
})
export class PaymentsToPayComponent implements OnInit, OnDestroy{
  //List of project invoice payments fetched from the Backend
  payments : ProjectInvoicePaymentReadyToPayDto[] = [];
  //To catch selected payments
  isPaymentChecked : boolean[] = [];

  constructor(private projectInvoiceService : ProjectInvoicesService,
    private paymentIdsService: PaymentIdsService,
    private fb : FormBuilder,
    private router : Router,
    private errorService: ErrorHandlingService) {
  }

  /**
   * Lifecycle hook: fetch project invoice suggested payments 
   * from the backend
  */  
  ngOnInit(): void {
    this.projectInvoiceService.getPaymentsToPay().subscribe(
      {
        next: res => {
          this.payments = res;
          this.payments.forEach(x => this.isPaymentChecked.push(false));
      },
      error: er => 
        {
          this.errorService.handleError(er);  
        }
      }
    )
  }

  /**
   * Get payments selected ids and set paymentIdsService Ids property
  */ 
  pay(){
    let paymentsIndices  : number[] = [];
    for(let i = 0; i < this.isPaymentChecked.length; i++){
      if (this.isPaymentChecked[i]){
        paymentsIndices.push(i);
      }
    }
    
    this.paymentIdsService.Ids = [];
    paymentsIndices.forEach(i => this.paymentIdsService.Ids.push(this.payments[i].id));
    
    this.router.navigate(['/projectinvoices/payids']);
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}
