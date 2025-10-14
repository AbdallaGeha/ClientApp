import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectInvoicesService } from '../project-invoices.service';
import { Router } from '@angular/router';
import { KeyValueDto } from 'src/app/model';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the creation of a new project invoice
*/
@Component({
  selector: 'app-project-invoice-create',
  templateUrl: './project-invoice-create.component.html',
  styleUrls: ['./project-invoice-create.component.css']
})
export class ProjectInvoiceCreateComponent implements OnInit, OnDestroy  {
  //Form for creating new project invoice
  form : FormGroup;
  //List of projects fetched from the backend
  projects : KeyValueDto[] = [];
  //List of suppliers fetched from the backend
  suppliers : KeyValueDto[] = [];
  //List of items fetched from the backend
  itemsKeyValue : KeyValueDto[] = [];

  constructor(private projectInvoiceService : ProjectInvoicesService,
    private fb : FormBuilder,
    private router : Router,
    public errorService: ErrorHandlingService) {
  }

  /**
   * Lifecycle hook: Initializes form and fetches all projects, suppliers, items 
   * when component loads
  */  
  ngOnInit(): void {
    this.form = this.fb.group({
      referenceNumber : ['', { validators : [Validators.required]}],
      date : ['', { validators : [Validators.required]}],
      projectId : ['', { validators : [Validators.required]}],
      supplierId : ['', { validators : [Validators.required]}],
      items : this.fb.array([])
    });

    this.fillProjects();
    this.fillSuppliers();
    this.fillItems();
  }

  /**
   * Fetch all projects from the API
  */  
  fillProjects(){
    this.projectInvoiceService.getProjectsKeyValue().subscribe(
      {
        next: res => {
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
    this.projectInvoiceService.getSuppliersKeyValue().subscribe(
      {
        next:  res => {
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
   * Fetch all items from the API
  */
  fillItems(){
    this.projectInvoiceService.getItemsKeyValue().subscribe(
      {
        next:       res => {
          this.itemsKeyValue = res;
      },
      error: er => 
        {
          this.errorService.handleError(er);   
        }
      }
    );
  }

  /**
   * Get items form array from main form
  */  
  get Items() : FormArray<FormGroup> {
    return this.form.controls['items'] as FormArray<FormGroup>
  }

  /**
   * Add new item form group to items form array
  */    
  addRow(){
    var row = this.fb.group({
      itemId : ['', { validators : [Validators.required]}],
      unit : ['', { validators : [Validators.required]}],
      quantity : ['', { validators : [Validators.required]}],
      price : ['', { validators : [Validators.required]}]
    });

    this.Items.push(row);
  }

  /**
   * Remove  item form group from items form array
  */    
  removeItem(index : number){
    this.Items.removeAt(index);
  }

  /**
   * Create a new project invoice by sending data to the API
  */  
  save(){
    var projectInvoice = this.form.value;
    projectInvoice.state = 1;
    this.projectInvoiceService.create(projectInvoice).subscribe(
      {
        next: res => {
          this.router.navigate(['/home']);
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
