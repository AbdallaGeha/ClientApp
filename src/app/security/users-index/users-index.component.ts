import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserDto } from '../security.models';
import { PageEvent } from '@angular/material/paginator';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles users pagination
*/
@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService,
    private errorService: ErrorHandlingService
  ) { }

  //List of users fetched from the backend
  users: UserDto[];
  columnsToDisplay = ['id', 'email', 'name', 'phonenumber', 'actions'];
  //Total users count fetched from the backend
  totalRecords : number;
  currentPage = 1;
  pageSize = 5;

  /**
   * Lifecycle hook: fetch users when component loads
  */    
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * fetch users  
  */   
  loadData(){
    this.authService.getUsers(this.currentPage, this.pageSize).subscribe(
      {
        next: res => {
          this.users = res.users;
          this.totalRecords = res.totalRecords;
        },
        error: er => { this.errorService.handleError(er); }
      }
    );
  }

  /**
   * set pagination and search and fetch users
  */    
  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}
