import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ProjectInvoiceCreationDto, ProjectInvoiceGroupPaymentCreationDto, ProjectInvoicePaymentCreationDto, ProjectInvoicePaymentReadyToPayDto, ProjectInvoiceUpdateDto, ProjectInvoiceUpdateGetDto, ProjectInvoiceViewRequestDto, ProjectInvoiceViewResponseDto } from './projectInvoices.model';
import { KeyValueDto } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for handling operations related project invoices and payments 
 * This service communicates with a Backend API
 */
export class ProjectInvoicesService {
  
  apiURL = environment.apiUrl_ProjectInvoiceManagement;

  constructor(private http: HttpClient) { }

  /**
   * Create a new project invoice by sending a POST request to the API
  */  
  create(projectInvoice : ProjectInvoiceCreationDto) : Observable<any> {
    return this.http.post(this.apiURL + '/projectinvoice', projectInvoice);
  }

  /**
   * Update a project invoice by sending a PUT request to the API
  */  
  update(id : number, projectInvoice : ProjectInvoiceUpdateDto ): Observable<any> {
    return this.http.put(this.apiURL + '/projectinvoice/' + id, projectInvoice);
  }

  /**
   * Fetch a project invoice to be updated from the API
  */  
  getForUpdate(id : number) : Observable<ProjectInvoiceUpdateGetDto>{
    return this.http.get<ProjectInvoiceUpdateGetDto>(this.apiURL + '/projectinvoice/putget/' + id);
  }

  /**
   *  Handles project invoice approval
  */
  approve(id: number) : Observable<any> {
    return this.http.put(this.apiURL + '/projectinvoice/approve/' + id, null);
  }

  /**
   * Fetch project invoice payments to be paid from the API
  */   
  getPaymentsToPay() : Observable<ProjectInvoicePaymentReadyToPayDto[]>{
    return this.http.get<ProjectInvoicePaymentReadyToPayDto[]>(this.apiURL + '/projectinvoice/paymentstopay');
  }

  /**
   * Fetch project invoice payments to be paid by set of ids from the API
  */  
  getPaymentsToPayByIds(ids : number[]) : Observable<any>{
    return this.http.post(this.apiURL + '/projectinvoice/paymentstopaybyids', ids);
  }

  /**
   * pay project invoice single payment  
  */  
  payment(paymentCreationDto : ProjectInvoicePaymentCreationDto) : Observable<any> {
    return this.http.post(this.apiURL + '/projectinvoice/payment', paymentCreationDto);
  }

  /**
   * pay project invoice group of payments  
  */  
  paymentGroup(paymentCreationDto : ProjectInvoiceGroupPaymentCreationDto) : Observable<any> {
    return this.http.post(this.apiURL + '/projectinvoice/paymentgroup', paymentCreationDto);
  }
  
  /**
   * Fetch projects as key value pairs from the API
  */   
  getProjectsKeyValue(): Observable<KeyValueDto[]> {
    return this.http.get<KeyValueDto[]>(this.apiURL + '/projectinvoice/projectskeyvalue');
  }
  
  /**
   * Fetch suppliers as key value pairs from the API
  */  
  getSuppliersKeyValue(): Observable<KeyValueDto[]> {
    return this.http.get<KeyValueDto[]>(this.apiURL + '/projectinvoice/supplierskeyvalue');
  }

  /**
   * Fetch items as key value pairs from the API
  */  
  getItemsKeyValue(): Observable<KeyValueDto[]> {
    return this.http.get<KeyValueDto[]>(this.apiURL + '/projectinvoice/itemskeyvalue');
  }
  
  /**
   * Fetch bank accounts as key value pairs from the API
  */  
  getBankAccountsKeyValue(): Observable<KeyValueDto[]> {
    return this.http.get<KeyValueDto[]>(this.apiURL + '/projectinvoice/bankaccountskeyvalue');
  }
  
  /**
   * Fetch project invoices detailed info by provided criteria from the API
  */  
  getProjectInvoiceView(dto : ProjectInvoiceViewRequestDto): Observable<ProjectInvoiceViewResponseDto>{
    return this.http.post<ProjectInvoiceViewResponseDto>(this.apiURL + '/projectinvoice/projectinvoiceview', dto);
  }

}
