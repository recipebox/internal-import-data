const {
    google
} = require('googleapis');


async function listMajors(auth) {
    const sheets = google.sheets({
        version: 'v4',
        auth,
    });
    const sheetParam = {
        spreadsheetId: '1UWVybrzMLks3FKyLqI4uePuQWSpQNCcn9peoC-ZWQPE',
        range: 'recipes!A:D',
    }

    try {
        let response = await sheets.spreadsheets.values.get(sheetParam)
        const rows = response.data.values;
        if (rows.length) {
            rows.map((row) => {
                console.log(`${row[0]}, ${row[1]}, ${row[2]}`);
            });
        } else {
            console.log('No data found.');
        }
    } catch (e) {
        console.log('err:', e)
    }

}


module.exports = {
    listMajors
}