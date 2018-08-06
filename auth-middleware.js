const jwt = require('jsonwebtoken')
const config = require('./config.js')
const DB = require('./db.js')

module.exports = async (req, res, next) => {
    const authorization = req.get('Authorization')
    if (authorization) {
        const token = authorization.replace('Bearer ', '')
        try {
            const { userId } = jwt.verify(token, config.APP_SECRET)
            if (userId) {
                req.user = await DB.Read('Users', { _id: userId })
            }
        } catch (e) {}
    }
    next();
}