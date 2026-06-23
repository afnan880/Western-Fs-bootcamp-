import { useState, useEffect } from 'react';
 
function Customers(){
    const [count, setCount]=useState(1);
    const [customer,setCustomer] =useState({id:1,name:'',email:'',phone:'',website:''});
    if (
count < 1 ||count > 10) {
    setCount(1);
    return;
}        
 
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${count}`);
                const customer = await response.json();
                setCustomer(customer);
                console.log('Fetched customers:', customer);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, [count]);
 
    return(
        <div>
            <h1>Customers</h1>
 <ul>
<li key={customer.id}>
<h2>{customer.name}</h2>
<p>{customer.email}</p>
<p>{customer.phone}</p>
<p>{customer.website}</p>
</li>

 </ul>

<button onClick={() => setCount(count+1)}>Next customer</button>
<button onClick={() => setCount(count-1)}>previous customer</button>


        </div>
    );
}
 
export default Customers;
