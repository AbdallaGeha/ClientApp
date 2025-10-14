import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BankAccountDto } from '../bankAccounts.model';
import { BankAccountsService } from '../bank-accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles bank accounts pagination and search
*/
@Component({
  selector: 'app-bank-account-index',
  templateUrl: './bank-account-index.component.html',
  styleUrls: ['./bank-account-index.component.css']
})
export class BankAccountIndexComponent implements OnInit, OnDestroy {
  //Form for search keyword
  form: FormGroup;
  //List of bank accounts fetched from the backend
  bankAccounts: BankAccountDto[] = [];
  columnsToDisplay = ['id', 'accountName', 'accountNumber', 'bank','actions'];
  //Total bank accounts count fetched from the backend
  totalRecords : number;
  
  currentPage = 1;
  pageSize = 5;
  searchVal: string = "";
  
  constructor(private bankAccountService: BankAccountsService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private errorService: ErrorHandlingService
    ) {
    
  }

  /**
   * Lifecycle hook: Initializes form and get paging and search info
   * from url and fetches banck accounts when component loads
  */
  ngOnInit(): void {
    this.form = this.fb.group({
      search : ['']
    });

    this.readParametersFromURL();
  }

  /**
   * Get paging and search info from url 
   * and fetch banck accounts
  */
  private readParametersFromURL(){

    this.activatedRoute.queryParams.subscribe(params => {
      
      if (params['pageNumber']){
        this.currentPage = Number(params['pageNumber']);
      }

      if (params['pageSize']){
        this.pageSize = Number(params['pageSize']);
      }

      if (params['search']){
        this.searchVal = params['search'];
      }      

      this.loadData();
    });
  }

  /**
   * fetch banck accounts
  */  
  loadData(){
    this.bankAccountService.search(this.currentPage, this.pageSize, this.searchVal).subscribe(
      {
        next: res => {
          this.bankAccounts = res.bankAccounts;
          this.totalRecords = res.totalRecords;
        },
        error: er => 
        {
            this.errorService.handleError(er);
        }
      }
    );
  }

  /**
   * set pagination and search and fetch banck accounts
  */  
  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.searchVal = this.form.value.search;
    this.loadData();
  }
  
  /**
   * set search and fetch banck accounts
  */  
  search(){
    this.searchVal = this.form.value.search;
    this.loadData();
  }

  /**
   * delete bank account in backend and reload bankaccounts
  */ 
  delete(id: number){
    this.bankAccountService.delete(id).subscribe(
      {
        next: res => {
            this.loadData();
        },
        error: er => 
        {
            this.errorService.handleError(er);
        }
      }  
    );
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}