import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../items.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/error-handling.service';

/** 
 This component handles the creation of a new item 
 (this can be a construction item or an expense)
*/
@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent  implements OnInit, OnDestroy {
  
  //Form for creating new item 
  form: FormGroup;

  constructor(private itemsService: ItemsService,
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
        unit : ['', { validators : [Validators.required, Validators.maxLength(50)]}],
        affectInventory : [false]
      }
    )
  }

  /**
   * Create a new item by sending data to the API
  */  
  save(){
    let itemCreationDto = this.form.value;
    this.itemsService.create(itemCreationDto).subscribe(
      {
        next: result => 
          {
            this.router.navigate(['/items']);
          },
          error: error => 
          {
            this.errorService.handleError(error);
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