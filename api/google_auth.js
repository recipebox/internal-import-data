const fs = require('fs');
const fsPromises = fs.promises;
const readline = require('readline');

const {
    google
} = require('googleapis');

const CREDENTIAL_PATH = './credentials_meal_nation.json';
const TOKEN_PATH = './token.json';
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
];

async function getCredential() {
    try {
        let content = await fsPromises.readFile(CREDENTIAL_PATH)
        return JSON.parse(content)
    } catch (e) {
        console.log(e)
    }
}

async function authorize(credentials) {
    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    try {
        let token = await fsPromises.readFile(TOKEN_PATH)
        oAuth2Client.setCredentials(JSON.parse(token));
        return oAuth2Client
    } catch (e) {
        console.log(e)
        return getNewToken(oAuth2Client)
    }
}

async function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    let code = await ask("Enter the code from that page here: ")
    try {
        let response = await oAuth2Client.getToken(code)
        let token = response.tokens
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        return oAuth2Client

    } catch (e) {
        console.log('err', e)
    }
}

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, (input) => resolve(input));
    });
}


module.exports = {
    getCredential,
    authorize
}