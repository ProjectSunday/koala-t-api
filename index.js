var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const authMiddleware = require('./auth-middleware.js');

require('./db.js')
require('./debug.js')

const { url, authenticate } = require('./google-auth');

var schema = buildSchema(`
    type Query {
        hello: String
        getGoogleAuthUrl: String
        leaderboard: [ Rank ]
    }
    type Mutation {
        authenticate (code: String): User
    }
    type User {
        _id: String
        googleId: String
        email: String
        givenName: String
        familyName: String
        imageUrl: String
        jwtToken: String
    }
    type Rank {
        givenName: String
        familyName: String
        points: Int
    }
`);


var root = {
    hello: () => 'Hello world!',
    authenticate,
    getGoogleAuthUrl: () => url,
    leaderboard: () => {
        return [
            { givenName: 'blah', familyName: 'blah', points: 333 },
            { givenName: 'blah', familyName: 'blah', points: 333 },
            { givenName: 'blah', familyName: 'blah', points: 333 },
            { givenName: 'blah', familyName: 'blah', points: 333 },
            { givenName: 'blah', familyName: 'blah', points: 333 },
            { givenName: 'blah', familyName: 'blah', points: 333 },
        ]
    }
};

var app = express();
app.use(authMiddleware);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(3000, () => console.log('API Server running on localhost:3000/graphql'));