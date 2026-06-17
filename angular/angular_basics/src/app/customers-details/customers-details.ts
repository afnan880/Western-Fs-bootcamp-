import { Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerServices } from '../services/customer-services';
import { CustomerInfo } from '../interfaces/customer-info';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';








@Component({
  selector: 'app-customers-details',
  imports: [AsyncPipe],
  templateUrl: './customers-details.html',
  styleUrl: './customers-details.css',
})
export class CustomersDetails {
  route = inject(ActivatedRoute);
  customerService = inject(CustomerServices);
  customerId!: number;
  customers$!: Observable<CustomerInfo[]>;

  constructor() {
    this.customerId = parseInt(this.route.snapshot.params['id']);
    if (this.customerId) {
      this.customers$ = this.customerService.getCustomerById(this.customerId);
      console.log('Customer Details:' + this.customers$);
    }
  }


    

}









