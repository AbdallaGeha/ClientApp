import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../items.service';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the update of an existing item
*/
@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit, OnDestroy {
  //Item id to get from url
  id: number;
  //Form to edit item
  form: FormGroup;
  
  constructor(private itemsService: ItemsService,
    private fb: FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    public errorService: ErrorHandlingService) {
    
  }
  
  /**
   * Lifecycle hook: Initializes form and fetches item  
   * when component loads
  */  
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name : ['', { validators : [Validators.required, Validators.maxLength(50)]}],
        unit : ['', { validators : [Validators.required, Validators.maxLength(50)]}],
        affectInventory : [false]
      }
    )

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.fillForm();
    })
  }

  /**
   * Fetch item from the API
  */  
  fillForm(){
    if (this.id){
      this.itemsService.getForUpdate(this.id).subscribe(
        {
          next: res => {
            this.form.patchValue(res);
        },
        error: er => 
          {
            this.errorService.handleError(er);
          }
        }
      );
    }
  }

  /**
   * Update item by sending data to the API
  */  
  save(){
    let itemUpdateDto = this.form.value;
    this.itemsService.update(this.id,itemUpdateDto).subscribe(
      {
        next: result => 
        {
          this.router.navigate(['/items']);
        },
        error: er => 
        {
          this.errorService.handleError(er);
        }
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