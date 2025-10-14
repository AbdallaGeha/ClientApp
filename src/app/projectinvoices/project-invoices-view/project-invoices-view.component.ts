import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectInvoicesService } from '../project-invoices.service';
import {  ProjectInvoiceViewDto, ProjectInvoiceViewRequestDto } from '../projectInvoices.model';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KeyValueDto } from 'src/app/model';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling.service';

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
              private fb : FormBuilder,
              private router: Router,
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

    this.fillProjects();
    this.fillSuppliers();

    this.loadData();
  }

  /**
   * Fetch all projects from the API
  */  
  fillProjects(){
    this.projectInvoicesService.getProjectsKeyValue().subscribe(
      {
        next:       res => {
          this.projects = res;
        },
      error: er => 
        {
          this.errorService.handleError(er);  
        }
      }
    );
  }

  /**
   * Fetch all suppliers from the API
  */  
  fillSuppliers(){
    this.projectInvoicesService.getSuppliersKeyValue().subscribe(
      {
        next:       res => {
          this.suppliers = res;
        },
      error: er => 
        {
          this.errorService.handleError(er);  
        }
      }
    );
  }

  /**
   * fetch project invoices detailed info 
  */   
  loadData(){
    var requestDto : ProjectInvoiceViewRequestDto = {
      id: this.form.value.id, 
      reference: this.form.value.reference, 
      fromDate: this.form.value.fromDate,
      toDate: this.form.value.toDate,
      page: this.currentPage,
      pageSize: this.pageSize,
      projectId: this.form.value.projectId == "" ? null : this.form.value.projectId,
      state: this.form.value.state == "" ? null : this.form.value.state,
      supplierId: this.form.value.supplierId == "" ? null : this.form.value.supplierId,
    }

    this.projectInvoicesService.getProjectInvoiceView(requestDto).subscribe(
      {
        next: res => {
          this.invoices = res.data;
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
