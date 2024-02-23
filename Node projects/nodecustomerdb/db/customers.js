const db = require('./dbconfig');

const getAllCustomers = (req, res) => {
    db.query('select * from customers', (error, result) => {
        if(error){
            console.log(error);
        }
        else{
            res.json(result.rows);
        }
    });
}

const getCustomerById = (req, res) => {
    const query = {
        text: 'select * from customers where id = $1',
        values: [req.params.id],
    }
    db.query(query, (error, result) => {
        if(error){
            return console.error('Error executing query', error.stack);
        }
        else{
            if(result.rows.length > 0){
                res.json(result.rows);
            }
            else{
                res.status(404).end();
            }
        }
    });
};

const createNewCustomer = (req, res) => {
    const newCustomer = req.body;

    const query = {
        text: 'insert into customers (firstname, lastname, email, phone) values ($1, $2, $3, $4)',
        values: [newCustomer.firstname, newCustomer.lastname, newCustomer.email, newCustomer.phone],
    }

    db.query(query, (error, result) => {
        if(error){
            return console.error('Error executing query', error.stack);
        }
    });
    res.json(newCustomer);
};

const deleteCustomerById = (req, res) => {
    const query = {
        text: 'delete from customers where id = $1',
        values: [req.params.id],
    }
    
    db.query(query, (error, result) => {
        if(error){
            return console.error('Error executing query', error.stack);
        }
    });
    res.status(204).end();
}

const updateCustomerById = (req, res) => {
    const updatedCustomer = req.body;

    const query = {
        text: 'update customers set firstname=$1, lastname=$2, email=$3, phone=$4 where id = $5',
        values: [updatedCustomer.firstname, updatedCustomer.lastname, updatedCustomer.email, updatedCustomer.phone, req.params.id],
    }

    db.query(query, (error, result) => {
        if(error){
            return console.error('Error executing query', error.stack);
        }
    });
    res.json(updatedCustomer);
}

const deleteAllCustomers = () => {
    db.query('delete from customers', (error, res) => {
        if(error){
            return console.error('Error executing query', error.stack);
        }
    });
}

module.exports = {
    getAllCustomers: getAllCustomers,
    getCustomerById: getCustomerById,
    createNewCustomer: createNewCustomer,
    deleteCustomerById: deleteCustomerById,
    updateCustomerById: updateCustomerById,
    deleteAllCustomers: deleteAllCustomers
}