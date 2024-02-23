const express = require('express');

const app = express();

const port = 3000;

app.get("/home/:username/:age", (request, response) => {
    if(request.params.age < 18){
        response.send("User is too young.");
    }
    else{
        response.send(`Welcome ${request.params.username}, you are ${request.params.age}`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});