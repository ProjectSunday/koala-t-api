const { google } = require('googleapis');

const jwt = require('jsonwebtoken')

const DB = require('./db.js');

const config = {
    GOOGLE_CLIENT_ID: '191304805062-up3pgt0b7j308dl3185fv34405sn145p.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: 'QQaKra7zz_WpOlgSgDD1OXfI',
    GOOGLE_REDIRECT_URL: 'http://localhost:8080/authcallback',
    APP_SECRET: 'koala super secret',
}

const oauth2Client = new google.auth.OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_CLIENT_SECRET,
    config.GOOGLE_REDIRECT_URL
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
// const scopes = [ 'email', 'profile' ]

const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: 'email profile'
});

const authenticate = async (args) => {
    // console.log('authenticate args', args)
    const { tokens } = await oauth2Client.getToken(args.code)
    oauth2Client.credentials = tokens;

    const plus = google.plus({
        version: 'v1',
        auth: oauth2Client
    });

    const res = await plus.people.get({ userId: 'me' });

    const googleId = res.data.id;

    let user = await DB.Read('Users', { googleId })

    if (!user) {
        const email = res.data.emails[0].value;
        const { givenName, familyName } = res.data.name;
        const imageUrl = res.data.image.url;
        user = await DB.Create('Users', { googleId, email, givenName, familyName, imageUrl })
    }
    const jwtToken = jwt.sign({ userId: user._id }, config.APP_SECRET)
    return { ...user, jwtToken }
}

module.exports = { url, authenticate }