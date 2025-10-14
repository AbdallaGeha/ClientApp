import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Service for handling http errors
 * 400 : set errorMessage field
 * 401, 403: display unauthorized page
 * 500 and other errors: display error page
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  public errorMessage: string;

  constructor(private router: Router) { }

  handleError(error : any){
      if (error.status == 400){
        this.errorMessage = error.error;
      }
      else if (error.status == 401 || error.status == 403){
        this.router.navigate(['/unauthorized']); 
      }
      else{
        console.log(error);
        this.router.navigate(['/error']); 
      } 
  }

  resetError(){
    this.errorMessage = "";
  }
}
