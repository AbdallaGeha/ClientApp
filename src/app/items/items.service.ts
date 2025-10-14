import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCreationDto, ItemDto, ItemsPaginateDto, ItemUpdateDto, ItemUpdateGetDto } from './items.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for handling operations related to items
 * This service communicates with a Backend API
 */
export class ItemsService {

  apiURL = environment.apiUrl_ProjectInvoiceManagement;

  constructor(private http: HttpClient) { }

  /**
   * Create a new item by sending a POST request to the API
  */  
  create(item : ItemCreationDto) : Observable<any> {
    return this.http.post(this.apiURL + '/item', item);
  }

  /**
   * Update an item by sending a PUT request to the API
  */  
  update(id : number, item : ItemUpdateDto ): Observable<any> {
    return this.http.put(this.apiURL + '/item/' + id, item);
  }

  /**
   * Fetch an item to be updated from the API
  */  
  getForUpdate(id : number) : Observable<ItemUpdateGetDto>{
    return this.http.get<ItemUpdateGetDto>(this.apiURL + '/item/' + id);
  }

  /**
   * Fetch all items from the API
  */  
  getAll(): Observable<ItemDto[]> {
    return this.http.get<ItemDto[]>(this.apiURL + '/item/all');
  }

  /**
   * Fetch items by pagination and search info from the API
  */  
  search(pageNumber : number, pageSize : number, search : string): Observable<ItemsPaginateDto> {
    let url = `/item/search?pagenumber=${pageNumber}&pagesize=${pageSize}&search=${search}`;
    return this.http.get<ItemsPaginateDto>(this.apiURL + url);
  }

  /**
   * Delete an item by sending a DELETE request to the API
  */  
  delete(id: number) : Observable<any> {
    return this.http.delete(this.apiURL + '/item/' + id);
  }
}
