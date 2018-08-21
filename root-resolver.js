const bcrypt = require('bcrypt')
const validator = require("email-validator");

const DB = require('./db.js')
const BCRYPT_SALT_ROUNDS = 10

const { authenticate, getGoogleAuthUrl } = require('./google-auth.js')

module.exports = {
    hello: () => 'Hello world!',
    authenticate,
    getGoogleAuthUrl,
    leaderboard: async () => {
        const users = await DB.readMany('Users', {}, { sort: { points: -1 }})
        return users.map(({ givenName, familyName, points }) => ({ givenName, familyName, points }))
    },
    signUp: async (user) => {
        if (!validator.validate(user.email)) throw 'ERROR_INVALID_EMAIL'

        const userExists = await DB.read('Users', { email: user.email })
        if (userExists) throw 'ERROR_EMAIL_TAKEN'

        user.password = await bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS)
        user.points = 0;
        return DB.create('Users', user)
    },
    signIn: async ({ email, password }) => {
        const user = await DB.read('Users', { email })
        if (!user) throw 'ERROR_ACCOUNT_DOES_NOT_EXISTS'

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw 'ERROR_PASSWORD_INCORRECT'

        return user
    }
}