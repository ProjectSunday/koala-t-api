const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Query {
        hello: String
        getGoogleAuthUrl: String
        leaderboard: [ Rank ]
        signIn (email: String!, password: String!) : User
    }
    type Mutation {
        authenticate (code: String): User
        signUp(
            email: String!,
            password: String!,
            givenName: String!,
            familyName: String!
        ) : User
    }
    type User {
        _id: String
        googleId: String
        email: String
        givenName: String
        familyName: String
        imageUrl: String
        jwtToken: String
        role: String
        points: Int
    }
    type Rank {
        givenName: String
        familyName: String
        points: Int
    }
`);