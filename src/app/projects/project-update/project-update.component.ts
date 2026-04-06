import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling.service';
import { ProjectUpdateDto } from '../projects.model';

/** 
 This component handles the update of an existing project
*/
@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit, OnDestroy {
  //Project id to get from url
  id: number;
  //Form to edit project
  form: FormGroup;
  
  constructor(private projectsService: ProjectsService,
    private fb: FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    public errorService: ErrorHandlingService) {
    
  }
  
  /**
   * Lifecycle hook: Initializes form and fetches project  
   * when component loads
  */  
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name : ['', { validators : [Validators.required, Validators.maxLength(50)]}],
        state : ['', { validators : [Validators.required]}]
      }
    )

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.fillForm();
    })
  }

  /**
   * Fetch project from the API
  */  
  fillForm(){
    if (this.id){
      this.projectsService.getForUpdate(this.id).subscribe(
      {
        next: res => {
        this.form.patchValue(res);
      },
        error: error => this.errorService.handleError(error)
      });
    }
  }

  /**
   * Update project by sending data to the API
  */  
  save(){
    const projectUpdateDto : ProjectUpdateDto = { 
      ...this.form.value,
      state : Number(this.form.value.state)
    };
    this.projectsService.update(this.id, projectUpdateDto).subscribe(
    {
      next: () => this.router.navigate(['/projects']),
      error: error => this.errorService.handleError(error)
    });
  }

  /**
   * Lifecycle hook: Clear service error message when component destroyed 
  */ 
  ngOnDestroy(): void {
    this.errorService.resetError();
  }  
}