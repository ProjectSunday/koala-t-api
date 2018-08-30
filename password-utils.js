const bcrypt = require('bcrypt')

const BCRYPT_SALT_ROUNDS = 10

module.exports = {
    compare: async (password, hash) => {
        return bcrypt.compare(password, hash)
    },
    hash: async (password) => {
        return bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    }
}