import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemDto } from '../items.model';
import { ItemsService } from '../items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles items pagination and search
*/
@Component({
  selector: 'app-item-index',
  templateUrl: './item-index.component.html',
  styleUrls: ['./item-index.component.css']
})
export class ItemIndexComponent  implements OnInit, OnDestroy {
  //Form for search keyword
  form: FormGroup;
  //List of items fetched from the backend
  items: ItemDto[] = [];
  columnsToDisplay = ['id', 'name', 'unit', 'affectInventory','actions'];
  //Total items count fetched from the backend
  totalRecords : number;
  currentPage = 1;
  pageSize = 5;
  searchVal: string = "";
  
  constructor(private itemService: ItemsService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private errorService: ErrorHandlingService
    ) {
    
  }

  /**
   * Lifecycle hook: Initializes form and get paging and search info
   * from url and fetches items
  */  
  ngOnInit(): void {
    this.form = this.fb.group({
      search : ['']
    });

    this.readParametersFromURL();
  }

  /**
   * Get paging and search info from url 
   * and fetch items
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
   * fetch items 
  */
  loadData(){
    this.itemService.search(this.currentPage, this.pageSize, this.searchVal).subscribe(
      {
        next: res => {
          this.items = res.items;
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
   * set pagination and search and fetch items
  */  
  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.searchVal = this.form.value.search;
    this.loadData();
  }
  
  /**
   * set search and fetch items 
  */  
  search(){
    this.searchVal = this.form.value.search;
    this.loadData();
  }

  /**
   * delete item in backend and reload items
  */  
  delete(id: number){
    this.itemService.delete(id).subscribe(
      {
        next:       res => {
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