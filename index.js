//index.js

const graphlHTTP = require('express-graphql')
const express = require('express');
const mongoose = require('mongoose');
const schema = require('./schema');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

mongoose.Promise = global.Promise;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log(" La conexión con la base de datos MongoDB se estableció satisfactoriamente");
})
app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to GraphQL'
    })
});

app.use('/graphql', graphlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});