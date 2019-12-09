const fs = require('fs');
const {google} = require('googleapis');
const token = require('./token.json');
var credentials = require('./credentials.json');
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
// console.log(token);
oAuth2Client.setCredentials(token);
const sheets = google.sheets({version: 'v4',auth: oAuth2Client});
module.exports = sheets;