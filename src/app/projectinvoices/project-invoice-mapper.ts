import { Injectable } from '@angular/core';
import { ProjectInvoiceViewRequestDto } from './projectInvoices.model';

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

  normalizeNumber(value: any): number | null {
    return value === '' || value == null ? null : Number(value); 
  }

}
