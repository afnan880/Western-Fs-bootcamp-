import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

function CustomerDetails(){

    const { id }  = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({ id: 0, name: '', email: '', phone: '', website: '' });

    useEffect(() => {
        const fetchCustomers = async () => {
            console.log('useEffect fetching customer with id:', id);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const customer = await response.json();
                setCustomer(customer);
                console.log('Fetched customer:', customer);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };
        fetchCustomers();
    }, [id]);

    return(
        <div>
            <h1>Customer Details</h1>
            <ul>
                <li key={customer.id}>
                    <h2>{customer.name}</h2>
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                    <p>{customer.website}</p>
                </li>
            </ul>
            <button onClick={() => navigate('/customers')}>Back to Customers</button>
        </div>
    )
}

export default CustomerDetails;
