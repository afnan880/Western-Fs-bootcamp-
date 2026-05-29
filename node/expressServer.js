const express = require('express');
const app = express();
const port = 3000;

var customers = [
    {id: 1, name: 'John doe'},
    {id: 2, name: 'Jane doe'},
    {id: 3, name: 'Bob doe'}
];
var users = [
    {id: 1, name: 'John doe', age : '25'},
    {id: 2, name: 'Jane doe', age : '30'},
    {id: 3, name: 'Bob doe', age : '35'},
];


app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/customers', (req, res) => {
   let customers_id = parseInt(req.params.id);
   if (customer_id) {
    let customer = customers.find(cus => cus.id === customer_id);
    if (customer){
        res.json(customer);
    }
    else{
        res.status(404).send('Customer not found');
    }
   } 
});
app.get('/users/:id', (req, res) => {
    let users_id = parseInt(req.params.id);
    if (users_id) {
        let user = users.find(user => user.id === users_id);
        if (user){
            res.json(user);
        }
        else{
            res.status(404).json('User not found');
        }
        }
    });
    












app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/customers/1',(req, res) => {

})

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
});