const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

require('./debug.js')

const PORT = process.env.PORT || 9001

const authMiddleware = require('./auth-middleware.js')
const DB = require('./db.js')
const appInit = require('./app-init.js')
const schema = require('./schema.js')
const root = require('./root-resolver.js')

const app = express()
app.use(cors())
app.use(authMiddleware)
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}))

async function start() {
    await DB.init()
    await appInit()
    app.listen(PORT, () => console.log(`API Server running on localhost:${PORT}/graphql`))
}
start()