import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentIdsService {

  Ids: number[] = [];
  constructor() { }
}
