import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';
import { User } from './user/user';
import { Students } from './students/students';
import { Customers } from './customers/customers';
import { CustomersDetails } from './customers-details/customers-details';
import { AddCustomer } from './add-customer/add-customer';
import { UpdateCustomer } from './update-customer/update-customer';




export const routes: Routes = [
    {
        path: 'sign-in',
        component: SignIn
    }, 
    {
        path: 'sign-up',
        component: SignUp
    },
    {
        path: 'user',
        component: User
    },
     {
        path: 'user/:id',
        component: User
    },
    {
        path: 'student',
        component: Students
    },
    {
        path: 'customers',
        component: Customers
    
    },
    {
        path: 'add-customers',
        component: AddCustomer
    },
     {
        path: 'edit-customers/:id',
        component: UpdateCustomer
    },
    {
        path: 'customers/:id',
        component: CustomersDetails
    },
    {
        path:'',
        redirectTo: 'Home',
        pathMatch: 'full'
    },
    
    
];