import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyValueDto } from '../model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

    apiURL = environment.apiUrl_ProjectInvoiceManagement;
  
    constructor(private http: HttpClient) { }
  
    /**
     * Fetch all banks as key value pairs from the API
    */  
    getBanksKeyValue(): Observable<KeyValueDto[]> {
      return this.http.get<KeyValueDto[]>(this.apiURL + '/lookup/banks');
    }

    /**
     * Fetch projects as key value pairs from the API
    */   
    getProjectsKeyValue(): Observable<KeyValueDto[]> {
      return this.http.get<KeyValueDto[]>(this.apiURL + '/lookup/projects');
    }
  
    /**
     * Fetch suppliers as key value pairs from the API
    */  
    getSuppliersKeyValue(): Observable<KeyValueDto[]> {
      return this.http.get<KeyValueDto[]>(this.apiURL + '/lookup/suppliers');
    }

    /**
     * Fetch items as key value pairs from the API
    */  
    getItemsKeyValue(): Observable<KeyValueDto[]> {
      return this.http.get<KeyValueDto[]>(this.apiURL + '/lookup/items');
    }
  
    /**
     * Fetch bank accounts as key value pairs from the API
    */  
    getBankAccountsKeyValue(): Observable<KeyValueDto[]> {
      return this.http.get<KeyValueDto[]>(this.apiURL + '/lookup/bankaccounts');
    }    
}
