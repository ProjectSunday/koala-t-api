var express = require('express')
var graphqlHTTP = require('express-graphql')
const cors = require('cors')
require('./debug.js')

const PORT = process.env.PORT || 3001

const authMiddleware = require('./auth-middleware.js')
const DB = require('./db.js')
const schema = require('./schema.js')

const { url, authenticate } = require('./google-auth.js')

var root = {
    hello: () => 'Hello world!',
    authenticate,
    getGoogleAuthUrl: () => url,
    leaderboard: async () => {
        const users = await DB.readMany('Users', {}, { sort: { points: -1 }})
        return users.map(({ givenName, familyName, points }) => ({ givenName, familyName, points }))
    }
}

var app = express()
app.use(cors())
app.use(authMiddleware)
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}))

async function start() {
    await DB.init()
    app.listen(PORT, () => console.log(`API Server running on localhost:${PORT}/graphql`))
}
start()