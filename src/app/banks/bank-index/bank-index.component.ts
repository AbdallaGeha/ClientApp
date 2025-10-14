import { Component, OnDestroy, OnInit } from '@angular/core';
import { BankDto } from '../banks.model';
import { BanksService } from '../banks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles banks pagination and search
*/
@Component({
  selector: 'app-bank-index',
  templateUrl: './bank-index.component.html',
  styleUrls: ['./bank-index.component.css']
})
export class BankIndexComponent implements OnInit, OnDestroy {
  //Form for search keyword
  form: FormGroup;
  //List of banks fetched from the backend
  banks: BankDto[] = [];
  columnsToDisplay = ['id', 'name', 'actions'];
  //Total banks count fetched from the backend
  totalRecords : number;
  currentPage = 1;
  pageSize = 5;
  searchVal: string = "";
  
  constructor(private bankService: BanksService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private errorService: ErrorHandlingService
    ) {
    
  }

  /**
   * Lifecycle hook: Initializes form and get paging and search info
   * from url and fetches bancks
  */  
  ngOnInit(): void {
    this.form = this.fb.group({
      search : ['']
    });

    this.readParametersFromURL();
  }

  /**
   * Get paging and search info from url 
   * and fetch bancks
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
   * fetch bancks 
  */ 
  loadData(){
    this.bankService.search(this.currentPage, this.pageSize, this.searchVal).subscribe(
      {
        next: res => {
          this.banks = res.banks;
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
   * set pagination and search and fetch bancks
  */  
  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.searchVal = this.form.value.search;
    this.loadData();
  }
  
  /**
   * set search and fetch bancks 
  */ 
  search(){
    this.searchVal = this.form.value.search;
    this.loadData();
  }

  /**
   * delete bank in backend and reload banks
  */  
  delete(id: number){
    this.bankService.delete(id).subscribe(
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
