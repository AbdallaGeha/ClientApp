import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankCreationDto, BanksPaginateDto, BankUpdateDto, BankUpdateGetDto } from './banks.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for handling operations related to Banks
 * This service communicates with a Backend API
 */
export class BanksService {

  apiURL = environment.apiUrl_ProjectInvoiceManagement;

  constructor(private http: HttpClient) { }

  /**
   * Create a new bank by sending a POST request to the API
  */
  create(bank : BankCreationDto) : Observable<any> {
    return this.http.post(this.apiURL + '/bank', bank);
  }

  /**
   * Update a bank by sending a PUT request to the API
  */  
  update(id : number, bank : BankUpdateDto ): Observable<any> {
    return this.http.put(this.apiURL + '/bank/' + id, bank);
  }

  /**
   * Fetch a bank to be updated from the API
  */ 
  getForUpdate(id : number) : Observable<BankUpdateGetDto>{
    return this.http.get<BankUpdateGetDto>(this.apiURL + '/bank/' + id);
  }

  /**
   * Fetch banks by pagination and search info from the API
  */  
  search(pageNumber : number, pageSize : number, search : string): Observable<BanksPaginateDto> {
    let url = `/bank/search?pagenumber=${pageNumber}&pagesize=${pageSize}&search=${search}`;
    return this.http.get<BanksPaginateDto>(this.apiURL + url);
  }

  /**
   * Delete a bank by sending a DELETE request to the API
  */   
  delete(id: number) : Observable<any> {
    return this.http.delete(this.apiURL + '/bank/' + id);
  }

}
