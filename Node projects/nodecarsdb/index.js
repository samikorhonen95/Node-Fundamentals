const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use('/', routes);

const mongoURL = 'mongodb+srv://samikorhonen95:db1234@cluster0.g3rilgp.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoURL, { dbName: 'cardb', useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});