//index.js
import express from 'express';
import graphlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';
const app = express();
const PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://djra26111990:xGb4e9TWy2R3dc91@clustertestdevapps0-sgvd1.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority');
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