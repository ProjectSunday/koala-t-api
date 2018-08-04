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
const scopes = [ 'email', 'profile' ]

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});

module.exports = { url }