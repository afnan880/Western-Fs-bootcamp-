
import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerServices } from '../services/customer-services';
import { CustomerInfo } from '../interfaces/customer-info';
import { FormsModule } from '@angular/forms';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-update-customer',
  imports: [FormsModule,],
  templateUrl: './update-customer.html',
  styleUrl: './update-customer.css',
})
export class UpdateCustomer {
 
  route = inject(ActivatedRoute);
  customerService = inject(CustomerServices);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  
  customer: CustomerInfo = {
    customer_id: 0,
    customer_name: '',
    customer_email: '',
    age:0
  };
  customerId!: number;
 
  ngOnInit() {
    this.customerId = parseInt(this.route.snapshot.params['id']);
    if (this.customerId) {
       this.customerService.getCustomerById(this.customerId).subscribe((data: CustomerInfo[]) => {
        this.customer = data[0];
        console.log(this.customer);
        this.cdr.detectChanges();
      });
    }
  }
 
  updateCustomer(customer: CustomerInfo) {
    console.log('Updating customer:', customer);
    this.customerService.updateCustomer(this.customerId, customer).subscribe((data: any) => {
      console.log('Customer updated successfully', data);
    });
    this.router.navigate(['/customers']);
  }
}
 