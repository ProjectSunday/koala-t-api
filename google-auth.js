const { google } = require('googleapis');

const config = {
    GOOGLE_CLIENT_ID: '191304805062-up3pgt0b7j308dl3185fv34405sn145p.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: 'QQaKra7zz_WpOlgSgDD1OXfI',
    GOOGLE_REDIRECT_URL: 'http://localhost:8080/authcallback',
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
    red(res.data)
    // console.log(`Hello ${res.data}!`);


    return 'blah'



}

module.exports = { url, authenticate }