exports.handler = async (event, context) => {
    const API_KEY = process.env.API_KEY;
    const SHEET_ID = process.env.SHEET_ID;
    const RANGE = 'Update-Notes!A2:Z';

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Adjust as necessary
        },
        body: JSON.stringify({ data: data.values }),
    };
};