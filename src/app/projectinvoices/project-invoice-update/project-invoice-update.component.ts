import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Approved_State, Created_State, ProjectInvoiceItemUpdateGetDto, ProjectInvoiceUpdateDto, ProjectInvoiceUpdateGetDto } from '../projectInvoices.model';
import { ProjectInvoicesService } from '../project-invoices.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyValueDto } from 'src/app/model';
import { ErrorHandlingService } from 'src/app/error-handling.service';
import { LookupService } from 'src/app/shared/lookup.service';
import { EMPTY, forkJoin, switchMap } from 'rxjs';
import { ProjectInvoiceMapper } from '../project-invoice-mapper';

/** 
 This component handles the update of an existing project invoice
 and the approval of a project invoice
*/
@Component({
  selector: 'app-project-invoice-update',
  templateUrl: './project-invoice-update.component.html',
  styleUrls: ['./project-invoice-update.component.css']
})
export class ProjectInvoiceUpdateComponent  implements OnInit, OnDestroy {
  //Project invoice id to get from url
  id: number;
  //Form to edit project invoice
  form : FormGroup;
  //List of projects fetched from the backend
  projects : KeyValueDto[] = [];
  //List of suppliers fetched from the backend
  suppliers : KeyValueDto[] = [];
  //List of items fetched from the backend
  itemsKeyValue : KeyValueDto[] = [];
  //Project invoice fetched from the backend
  invoice: ProjectInvoiceUpdateGetDto;
  //A boolean used in change detection process
  isFormFilled = false;

  constructor(private projectInvoiceService : ProjectInvoicesService,
    private lookupService: LookupService,
    private mapper: ProjectInvoiceMapper,
    private datePipe: DatePipe,
    private fb : FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    public errorService: ErrorHandlingService) {
  }

  /**
   * Lifecycle hook: Initializes form and fetches all projects, suppliers, items 
   * and fetches project invoice from the backend when component loads
  */    
  ngOnInit(): void {
    this.form = this.fb.group({
      referenceNumber : ['', { validators : [Validators.required]}],
      date : ['', { validators : [Validators.required]}],
      projectId : ['', { validators : [Validators.required]}],
      supplierId : ['', { validators : [Validators.required]}],
      items : this.fb.array([])
    });

    this.activatedRoute.params.pipe(switchMap(
    p => 
    {
      const id = p['id']
      if (!id) {
        this.router.navigate(['/error']);
        return EMPTY;
      }
      this.id = id;	
      return forkJoin(
        {
          projects: this.lookupService.getProjectsKeyValue(),
          suppliers: this.lookupService.getSuppliersKeyValue(),
          items: this.lookupService.getItemsKeyValue(),
          pi : this.projectInvoiceService.getForUpdate(this.id) 	 
        } 
      )         
    }		
    )
    ).subscribe
      ({
        next: ({ projects, suppliers, items, pi}) => {
          this.projects = projects;
          this.suppliers = suppliers;
          this.itemsKeyValue = items;
          this.invoice = pi;

          this.populateForm(this.invoice);
        },
        error: er => this.errorService.handleError(er)	  
      }
      )
  }

  /**
   * Populate form
  */   
  private populateForm(pi: ProjectInvoiceUpdateGetDto){
    
    this.invoice = pi;
    this.invoice.date = this.datePipe.transform(this.invoice.date, 'yyyy-MM-dd') ?? '';
    
    if (this.invoice.items.length > 0){
      this.invoice.items.forEach(() => this.addRow());
    }

    this.form.patchValue(this.invoice);

    if (this.IsApproved)
      this.form.disable();

    this.isFormFilled = true;	
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
      id : [0],
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
   * Check if the project invoice can be saved
   * An approved invoice cant be saved
   * the form must be valid
   * the invoice should have at least one invoice item
   * the content has changed after loading 
  */     
  get CanSave() : boolean {
    return !this.IsApproved && 
    !this.form.invalid && 
    this.Items && 
    this.Items.length > 0 &&
    this.HasContentChanged;
  }

   /**
   * Update project invoice by sending data to the API
  */  
  save(){
    if (!this.CanSave) return;

    const formValues = this.form.value as ProjectInvoiceUpdateDto;
    const dto = this.mapper.MapToProjectInvoiceUpdateDto(formValues);
    
    this.projectInvoiceService.update(this.id, dto).subscribe(
    {
        next:  res => {
        this.router.navigate(['/projectinvoices/view']);
    },
        error: er => this.errorService.handleError(er)
    });
  }

  /**
   * Check if the project invoice can be approved
   * the invoice should be at created state (we can use end point
   * like CanApprove if we dont want to leak any logic 
  */   
  get CanApprove() : boolean {
    return this.invoice && this.invoice.state == Created_State 
    && !this.HasContentChanged;
  }

  /**
   * Check if the project invoice is approved
  */  
  get IsApproved(): boolean {
    return this.invoice && this.invoice.state == Approved_State;
  }

  /**
   * Check if the content of project invoice has changed since
   * we fetched the invoice from the API
  */    
  get HasContentChanged(): boolean {
    if (!this.isFormFilled)
      return false;

    if (!this.invoice) 
      return false;

    if (this.IsApproved)
      return false;

    if (this.form.invalid)
      return false;

    let invoiceForm = this.form.value;

    if (invoiceForm.referenceNumber !== this.invoice.referenceNumber)
      return true;

    if (invoiceForm.date !== this.invoice.date)
      return true;    

    if (Number(invoiceForm.projectId) !== this.invoice.projectId)
      return true;

    if (Number(invoiceForm.supplierId) !== this.invoice.supplierId)
      return true;

    if (invoiceForm.items.length !== this.invoice.items.length)
      return true;

    let arr = invoiceForm.items as ProjectInvoiceItemUpdateGetDto[]; 
    if (arr.findIndex(x => x.id == 0) !== -1)
      return true;

    let changeFound = false;
    for (let i = 0; i < arr.length; i++)
    {
      let rowToCompare = this.invoice.items.find(x => x.id == arr[i].id);
      if (Number(arr[i].itemId) !== rowToCompare?.itemId
        || arr[i].unit !== rowToCompare?.unit
        || arr[i].quantity !== rowToCompare?.quantity
        || arr[i].price !== rowToCompare?.price
     )
      {
        changeFound = true;
        break;
      }
    }

    return changeFound;
  }

  /**
   * Approve the project invoice 
   * by changing its state and adding new suggested payment
  */   
  approve(){
    if (!this.CanApprove) return;

    this.projectInvoiceService.approve(this.id).subscribe(
      {
        next:  res => {
          this.router.navigate(['/projectinvoices/view']);
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