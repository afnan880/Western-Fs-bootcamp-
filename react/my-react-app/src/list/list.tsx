import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';

function Customers(){

    const [customers, setCustomers] = useState([{ id: 0, name: '', email: '', phone: '', website: '' }]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
                const customers = await response.json();
                setCustomers(customers);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    return(
        <div>
            <h1>Customers</h1>
            <ul className="list-group">

                {customers.map((customer) => (
                    <li className="list-group-item"  key={customer.id}>
                        <NavLink to={`/customers/${customer.id}`}>{customer.name}</NavLink>
                    </li>
                ))}
            </ul>
            


        
            <Outlet />
        </div>
    )
}

export default Customers;