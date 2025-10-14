import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectCreationDto, ProjectDto, ProjectsPaginateDto, ProjectUpdateDto, ProjectUpdateGetDto } from './projects.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for handling operations related to projects
 * This service communicates with a Backend API
 */
export class ProjectsService {

  apiURL = environment.apiUrl_ProjectInvoiceManagement;

  constructor(private http: HttpClient) { }

  /**
   * Create a new project by sending a POST request to the API
  */    
  create(project : ProjectCreationDto) : Observable<any> {
    return this.http.post(this.apiURL + '/project', project);
  }

  /**
   * Update a project by sending a PUT request to the API
  */   
  update(id : number, project : ProjectUpdateDto ): Observable<any> {
    return this.http.put(this.apiURL + '/project/' + id, project);
  }

  /**
   * Fetch a project to be updated from the API
  */  
  getForUpdate(id : number) : Observable<ProjectUpdateGetDto>{
    return this.http.get<ProjectUpdateGetDto>(this.apiURL + '/project/' + id);
  }

  /**
   * Fetch all projects from the API
  */  
  getAll(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.apiURL + '/project/all');
  }

  /**
   * Fetch projects by pagination and search info from the API
  */   
  search(pageNumber : number, pageSize : number, search : string): Observable<ProjectsPaginateDto> {
    let url = `/project/search?pagenumber=${pageNumber}&pagesize=${pageSize}&search=${search}`;
    return this.http.get<ProjectsPaginateDto>(this.apiURL + url);
  }

  /**
   * Delete a project by sending a DELETE request to the API
  */    
  delete(id: number) : Observable<any> {
    return this.http.delete(this.apiURL + '/project/' + id);
  }
}
