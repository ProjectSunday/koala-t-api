const validator = require("email-validator");

const DB = require('./db.js')
const { compare, hash } = require('./password-utils.js')

const { authenticate, getGoogleAuthUrl } = require('./google-auth.js')

module.exports = {
    hello: () => 'Hello world!',
    authenticate,
    getGoogleAuthUrl,
    leaderboard: async () => {
        const users = await DB.readMany('Users', { role: 'user' }, { sort: { points: -1 }})
        return users.map(({ givenName, familyName, points }) => ({ givenName, familyName, points }))
    },
    promoteUser: async ({ _id, email }, { user }) => {
        console.log('user', user)
    },
    signUp: async (user) => {
        if (!validator.validate(user.email)) throw 'ERROR_INVALID_EMAIL'

        const userExists = await DB.read('Users', { email: user.email })
        if (userExists) throw 'ERROR_EMAIL_TAKEN'

        user.password = await hash(user.password)
        user.points = 0
        user.role = 'user'
        
        return DB.create('Users', user)
    },
    signIn: async ({ email, password }) => {
        const user = await DB.read('Users', { email })
        if (!user) throw 'ERROR_ACCOUNT_DOES_NOT_EXISTS'

        const match = await compare(password, user.password)
        if (!match) throw 'ERROR_PASSWORD_INCORRECT'

        return user
    }
}