import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the creation of a new construction project
*/
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit, OnDestroy {

  //Form for creating new project 
  form: FormGroup;

  constructor(private projectsService: ProjectsService,
    private fb: FormBuilder,
    private router : Router,
    public errorService: ErrorHandlingService) {
  }
  
  /**
   * Lifecycle hook: Initializes form when component loads
  */  
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name : ['', { validators : [Validators.required, Validators.maxLength(50)]}],
        state : ['', { validators : [Validators.required]}]
      }
    )
  }

  /**
   * Create a new project by sending data to the API
  */  
  save(){
    let projectCreationDto = this.form.value;
    this.projectsService.create(projectCreationDto).subscribe(
      {
        next: () => this.router.navigate(['/projects']),
        error: error => this.errorService.handleError(error)
      }
    )
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}
