module.exports = {
    APP_SECRET: process.env.APP_SECRET ||'koala super secret',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '191304805062-up3pgt0b7j308dl3185fv34405sn145p.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ||'QQaKra7zz_WpOlgSgDD1OXfI',
    GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL ||'http://localhost:8080/authcallback',
}