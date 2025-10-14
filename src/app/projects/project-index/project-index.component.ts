import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectDto } from '../projects.model';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles projects pagination and search
*/
@Component({
  selector: 'app-project-index',
  templateUrl: './project-index.component.html',
  styleUrls: ['./project-index.component.css']
})
export class ProjectIndexComponent implements OnInit, OnDestroy {
  //Form for search keyword
  form: FormGroup;
  //List of projects fetched from the backend
  projects: ProjectDto[] = [];
  columnsToDisplay = ['id', 'name', 'state','actions'];
  //Total projects count fetched from the backend
  totalRecords : number;
  currentPage = 1;
  pageSize = 5;
  searchVal: string = "";
  
  constructor(private projectService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private errorService: ErrorHandlingService
    ) {
    
  }

  /**
   * Lifecycle hook: Initializes form and get paging and search info
   * from url and fetches projects
  */  
  ngOnInit(): void {
    this.form = this.fb.group({
      search : ['']
    });

    this.readParametersFromURL();
  }

  /**
   * Get paging and search info from url 
   * and fetch projects
  */  
  private readParametersFromURL(){

    this.activatedRoute.queryParams.subscribe(params => {
      
      if (params['pageNumber']){
        this.currentPage = Number(params['pageNumber']);
      }

      if (params['pageSize']){
        this.pageSize = Number(params['pageSize']);
      }

      if (params['search']){
        this.searchVal = params['search'];
      }      

      this.loadData();
    });
  }

  /**
   * fetch projects 
  */
  loadData(){
    this.projectService.search(this.currentPage, this.pageSize, this.searchVal).subscribe(
      {
        next: res => {
          this.projects = res.projects;
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
   * set pagination and search and fetch projects
  */   
  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.searchVal = this.form.value.search;
    this.loadData();
  }
  
  /**
   * set search and fetch projects 
  */  
  search(){
    this.searchVal = this.form.value.search;
    this.loadData();
  }

  /**
   * delete project in backend and reload projects
  */  
  delete(id: number){
    this.projectService.delete(id).subscribe(
      {
        next: res => {
          this.loadData();
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