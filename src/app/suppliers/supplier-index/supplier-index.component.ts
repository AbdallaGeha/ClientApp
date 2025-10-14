import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierDto } from '../suppliers.model';
import { SuppliersService } from '../suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles suppliers pagination and search
*/
@Component({
  selector: 'app-supplier-index',
  templateUrl: './supplier-index.component.html',
  styleUrls: ['./supplier-index.component.css']
})
export class SupplierIndexComponent  implements OnInit, OnDestroy {
  //Form for search keyword
  form: FormGroup;
  //List of suppliers fetched from the backend
  suppliers: SupplierDto[] = [];
  columnsToDisplay = ['id', 'name', 'phone', 'email', 'address','actions'];
  //Total suppliers count fetched from the backend
  totalRecords : number;
  currentPage = 1;
  pageSize = 5;
  searchVal: string = "";
  
  constructor(private supplierService: SuppliersService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    public errorService: ErrorHandlingService
    ) {
    
  }

  /**
   * Lifecycle hook: Initializes form and get paging and search info
   * from url and fetches suppliers
  */  
  ngOnInit(): void {
    this.form = this.fb.group({
      search : ['']
    });

    this.readParametersFromURL();
  }

  /**
   * Get paging and search info from url 
   * and fetch suppliers
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
   * fetch suppliers 
  */ 
  loadData(){
    this.supplierService.search(this.currentPage, this.pageSize, this.searchVal).subscribe(
      {
        next: res => {
          this.suppliers = res.suppliers;
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
   * set pagination and search and fetch suppliers
  */  
  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.searchVal = this.form.value.search;
    this.loadData();
  }
  
  /**
   * set search and fetch suppliers 
  */  
  search(){
    this.searchVal = this.form.value.search;
    this.loadData();
  }

  /**
   * delete bank in backend and reload suppliers
  */  
  delete(id: number){
    this.supplierService.delete(id).subscribe(
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
