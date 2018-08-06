var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

require('./debug')

const { url, authenticate } = require('./google-auth');

var schema = buildSchema(`
    type Query {
        hello: String
        getGoogleAuthUrl: String
    }
    type Mutation {
        authenticate (code: String): String
    }
`);


var root = {
    hello: () => 'Hello world!',
    authenticate,
    getGoogleAuthUrl: () => url,
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(3000, () => console.log('API Server running on localhost:3000/graphql'));