//index.js

//Se importan librerias necesarias
import graphlHTTP from 'express-graphql';
import express from 'express';
import mongoose from 'mongoose';
import schema from './src/schemas/schema';
const expressPlayground = require('graphql-playground-middleware-express').default;
require('dotenv').config();

//Se instancia nuestra app
const app = express();
//Se declaran los valores del puerto y URI de Atlas mongoDB 
const PORT = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

//Se genera la conexion con Atlas MongoDB
mongoose.Promise = global.Promise;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("🚀 La conexión con la base de datos MongoDB se estableció satisfactoriamente");
})

//Se devuelve mensaje cuando se ingresa a la route / de la API
app.get('/', (req, res) => {
    res.json({
        msg: 'API Test'
    })
});

//Se devuelve graphiQL APP al ingresar a la route /graphql
app.use('/graphql', graphlHTTP({
    schema: schema,
    graphiql: true
}));

//Se devuelve Playground GraphQL al ingresar al realizar GET /playground
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(PORT, () => {
    console.log(`🚀 El servidor está escuchando por el puerto ${PORT}`);
});