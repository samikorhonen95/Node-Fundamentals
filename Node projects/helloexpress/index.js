const express = require('express');

const app  = express();

const port = 3000;

app.get("/", (request, response) => {
    response.send("Hello Express, this is updated right away!");
});

app.get("/home/:name", (request, response) => {
    response.send(`Welcome ${request.params.name}`);
});

app.get("/json/user", (request, response) =>{
    response.json({username: 'John'});
});

app.get("/about", (request, response) => {
    response.send("About us..");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});