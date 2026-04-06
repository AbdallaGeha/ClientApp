import { Injectable } from '@angular/core';
import { Created_State, ProjectInvoiceCreationDto, ProjectInvoiceUpdateDto, ProjectInvoiceViewRequestDto } from './projectInvoices.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectInvoiceMapper {

  constructor() { }

  MapToProjectInvoiceViewRequestDto(formValue: any, page: number, 
    pageSize: number) : ProjectInvoiceViewRequestDto {

    return {
      id: this.normalizeNumber(formValue.id),
      reference: formValue.reference || null,
      projectId: this.normalizeNumber(formValue.projectId),
      supplierId: this.normalizeNumber(formValue.supplierId),
      state: this.normalizeNumber(formValue.state),
      fromDate: formValue.fromDate || null,
      toDate: formValue.toDate || null,
      page: page,
      pageSize: pageSize
    }
  }

  MapToProjectInvoiceCreationDto(formValue: ProjectInvoiceCreationDto) : ProjectInvoiceCreationDto{
    return {
      ...formValue,
      state : Created_State,
      projectId: Number(formValue.projectId),
      supplierId : Number(formValue.supplierId),
      items: formValue.items.map(x => ({
        ...x,
        itemId: Number(x.itemId),
        quantity : Number(x.quantity),
        price: Number(x.price)
      }))
    };
  }

  MapToProjectInvoiceUpdateDto(formValue: ProjectInvoiceUpdateDto) : ProjectInvoiceUpdateDto{
    return {
      ...formValue,
      state : Created_State,
      projectId : Number(formValue.projectId),
      supplierId : Number(formValue.projectId),
      items: formValue.items.map(x => ({
        ...x,
        itemId : Number(x.itemId),
        quantity: Number(x.quantity),
        price: Number(x.price)
      }))
    };
  }

  normalizeNumber(value: any): number | null {
    return value === '' || value == null ? null : Number(value); 
  }

}
