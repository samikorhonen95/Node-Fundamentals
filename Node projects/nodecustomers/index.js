const express = require('express');
const app = express();
app.use(express.json());

const port = 3000;

let customers = [
    {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
]

app.get("/api/customers", (request, response) => {
    response.json(customers);
});

app.get("/api/customers/:id", (request, response) => {
    const customerId = request.params.id;

    const customer = customers.filter(customer => customer.id === customerId);
    if(customer.length > 0){
        response.json(customer);
    }
    else{
        response.status(404).end();
    }
});

app.post("/api/customers", (request, response) => {
    const newCustomer = {'id': Date.now().toString(), ...request.body};
    customers = [...customers, newCustomer];   
    response.send(newCustomer);
});

app.put("/api/customers/:id", (request, response) => {
    const id = request.params.id;
    const updatedCustomer = {'id': id, ...request.body};

    const index = customers.findIndex(customer => customer.id === id);
    customers.splice(index, 1, updatedCustomer);
    response.json(updatedCustomer);
});

app.delete("/api/customers/:id", (request, response) => {
    const id = request.params.id;

    customers = customers.filter(customer => customer.id !== id);
    response.status(204).end();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})