import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupplierCreationDto, SupplierDto, SuppliersPaginateDto, SupplierUpdateDto, SupplierUpdateGetDto } from './suppliers.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for handling operations related to suppliers
 * This service communicates with a Backend API
 */
export class SuppliersService {

  apiURL = environment.apiUrl_ProjectInvoiceManagement;

  constructor(private http: HttpClient) { }

  /**
   * Create a new supplier by sending a POST request to the API
  */  
  create(supplier : SupplierCreationDto) : Observable<any> {
    return this.http.post(this.apiURL + '/supplier', supplier);
  }

  /**
   * Update a supplier by sending a PUT request to the API
  */  
  update(id : number, supplier : SupplierUpdateDto ): Observable<any> {
    return this.http.put(this.apiURL + '/supplier/' + id, supplier);
  }

  /**
   * Fetch a supplier to be updated from the API
  */   
  getForUpdate(id : number) : Observable<SupplierUpdateGetDto>{
    return this.http.get<SupplierUpdateGetDto>(this.apiURL + '/supplier/' + id);
  }

  /**
   * Fetch all suppliers from the API
  */   
  getAll(): Observable<SupplierDto[]> {
    return this.http.get<SupplierDto[]>(this.apiURL + '/supplier/all');
  }

  /**
   * Fetch suppliers by pagination and search info from the API
  */   
  search(pageNumber : number, pageSize : number, search : string): Observable<SuppliersPaginateDto> {
    let url = `/supplier/search?pagenumber=${pageNumber}&pagesize=${pageSize}&search=${search}`;
    return this.http.get<SuppliersPaginateDto>(this.apiURL + url);
  }

  /**
   * Delete a supplier by sending a DELETE request to the API
  */  
  delete(id: number) : Observable<any> {
    return this.http.delete(this.apiURL + '/supplier/' + id);
  }
}