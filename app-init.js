const DB = require('./db.js')

const { compare, hash } = require('./password-utils.js')

module.exports = async () => {
    const password = process.env.SYS_DIR_PASSWORD || 'superkoala'
    await DB.createOrUpdate('Users', 
        { email: 'systemdirector' }, 
        { 
            email: 'systemdirector',
            givenName: 'system',
            familyName: 'director',
            password: await hash(password), role: 'director' 
        })
}