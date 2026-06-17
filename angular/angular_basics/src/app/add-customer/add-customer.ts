import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerInfo } from '../interfaces/customer-info';
import { CustomerServices } from '../services/customer-services';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-add-customer',
  imports: [FormsModule],
  templateUrl: './add-customer.html',
  styleUrl: './add-customer.css',
})
export class AddCustomer {

  customerService= inject(CustomerServices);
  router = inject(Router);

  customer = {
    customer_name: '',
    customer_email: '',
    age:0,
  };
 
    addCustomer(customerForm: CustomerInfo) {
    this.customerService.addCustomer(customerForm).subscribe({
      next: (data) => {
        console.log('Customer added successfully:', data);
        // Optionally, reset the form or navigate to another page
        this.customer = {
          customer_name: '',
          customer_email: '',
          age:0,
        };
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        console.error('Error adding customer:', error);
      },
    });
  }
 





}
