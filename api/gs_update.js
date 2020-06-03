const {
    google
} = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    updateGSValue
}

const HEADER = ["Title", "Description", "Cooking Time (Hour)", "Cooking Time (Minute)", "Prepare Time (Hour)", "Prepare Time (Minute)", "Total like", "Photo", "Ingredients"]

async function updateGSValue(authClient, data) {

    const request = {
        auth: authClient,
        spreadsheetId: '1UWVybrzMLks3FKyLqI4uePuQWSpQNCcn9peoC-ZWQPE',
        range: 'a1',
        valueInputOption: 'RAW',

        resource: {
            "values": data
        },
    };

    try {
        const response = (await sheets.spreadsheets.values.update(request)).data;
        // TODO: Change code below to process the `response` object:
        console.log(JSON.stringify(response, null, 2));
    } catch (err) {
        console.error(err);
    }
}