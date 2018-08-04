var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const { url } = require('./google-auth');

var schema = buildSchema(`
    type Query {
        hello: String
        getGoogleAuthUrl: String
    }
    type Mutation {
        authenticate: String
    }
`);


var root = {
    hello: () => 'Hello world!',
    authenticate: () => 'authenticate',
    getGoogleAuthUrl: () => url,
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(3000, () => console.log('API Server runnong on localhost:3000/graphql'));