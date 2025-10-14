import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccountCreationDto, BankAccountDto, BankAccountsPaginateDto, BankAccountUpdateDto, BankAccountUpdateGetDto } from './bankAccounts.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for handling operations related to bank accounts
 * This service communicates with a Backend API
 */
export class BankAccountsService {

  apiURL = 'https://localhost:7151/api';

  constructor(private http: HttpClient) { }

  /**
   * Create a new bank account by sending a POST request to the API
  */  
  create(bankAccount : BankAccountCreationDto) : Observable<any> {
    return this.http.post(this.apiURL + '/bankaccount', bankAccount);
  }

  /**
   * Update a bank account by sending a PUT request to the API
  */ 
  update(id : number, bankAccount : BankAccountUpdateDto ): Observable<any> {
    return this.http.put(this.apiURL + '/bankaccount/' + id, bankAccount);
  }

  /**
   * Fetch a bank account to be updated from the API
  */   
  getForUpdate(id : number) : Observable<BankAccountUpdateGetDto>{
    return this.http.get<BankAccountUpdateGetDto>(this.apiURL + '/bankaccount/' + id);
  }

  /**
   * Fetch all bank accounts from the API
  */ 
  getAll(): Observable<BankAccountDto[]> {
    return this.http.get<BankAccountDto[]>(this.apiURL + '/bankaccount/all');
  }

  /**
   * Fetch bank accounts by pagination and search info from the API
  */  
  search(pageNumber : number, pageSize : number, search : string): Observable<BankAccountsPaginateDto> {
    let url = `/bankaccount/search?pagenumber=${pageNumber}&pagesize=${pageSize}&search=${search}`;
    return this.http.get<BankAccountsPaginateDto>(this.apiURL + url);
  }

  /**
   * Delete a bank account by sending a DELETE request to the API
  */  
  delete(id: number) : Observable<any> {
    return this.http.delete(this.apiURL + '/bankaccount/' + id);
  }
}
