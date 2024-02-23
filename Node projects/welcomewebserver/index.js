const express = require('express');

const app = express();

const port = 3000;

app.get("/home/:username/:age", (request, response) => {
    response.send(`Welcome ${request.params.username} you are ${request.params.age} old`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});