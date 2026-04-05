import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectInvoicesService } from '../project-invoices.service';
import { ProjectInvoiceViewDto, ProjectInvoiceViewRequestDto } from '../projectInvoices.model';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KeyValueDto } from 'src/app/model';
import { ErrorHandlingService } from 'src/app/error-handling.service';
import { LookupService } from 'src/app/shared/lookup.service';
import { ProjectInvoiceMapper } from '../project-invoice-mapper';
import { forkJoin } from 'rxjs';

/** 
 This component displays list of project invoices detailed info 
 and provides paging and searching 
*/
@Component({
  selector: 'app-project-invoices-view',
  templateUrl: './project-invoices-view.component.html',
  styleUrls: ['./project-invoices-view.component.css']
})
export class ProjectInvoicesViewComponent implements OnInit, OnDestroy {
  //Form for searching criteria
  form: FormGroup;
  //List of projects fetched from the backend
  projects : KeyValueDto[] = [];
  //List of suppliers fetched from the backend
  suppliers : KeyValueDto[] = [];
  //List of project invoices detailed info fetched from the backend
  invoices: ProjectInvoiceViewDto[];
  columnsToDisplay = ['id', 'referenceNumber', 'date', 'project', 'supplier','state','amount','actions'];
  totalRecords : number;
  currentPage = 1;
  pageSize = 5;

  constructor(private projectInvoicesService: ProjectInvoicesService,
              private lookupService: LookupService,
              private mapper : ProjectInvoiceMapper,
              private fb : FormBuilder,
              private errorService: ErrorHandlingService) { }

  /**
   * Lifecycle hook: Initializes search form and fetches project
   * invoices detailed info when component loads
  */               
  ngOnInit(): void {

    this.form = this.fb.group({
      id: [null],
      reference : [null],
      projectId : [''],
      supplierId : [''],
      state: [''],
      fromDate: [null],
      toDate: [null]
    });

    this.loadLookups();
    this.loadData();
  }

  /**
   * Fetch projects, suppliers
  */   
  loadLookups(){
    forkJoin({
      projects: this.lookupService.getProjectsKeyValue(),
      suppliers: this.lookupService.getSuppliersKeyValue()
    }).subscribe({
      next: ({projects, suppliers}) =>{
        this.projects = projects;
        this.suppliers = suppliers;
      },
      error: er => this.errorService.handleError(er)
    });
  }

  /**
   * fetch project invoices detailed info 
  */   
  loadData(){
    
    const requestDto = this.mapper.MapToProjectInvoiceViewRequestDto(this.form.value,
      this.currentPage,
      this.pageSize
    );

    this.projectInvoicesService.getProjectInvoiceView(requestDto).subscribe(
      {
        next: res => {
          this.invoices = res.data;
          this.totalRecords = res.totalRecords;
        },
        error: er => this.errorService.handleError(er)
      }
    );
  }

  /**
   * fetch project invoices detailed info 
  */  
  search(){
    this.loadData();
  }

  /**
   * set pagination and fetch project invoices detailed info 
  */  
  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}
