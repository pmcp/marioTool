// Create a file: server/api/sheets.js
import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
  try {
    // For public sheets, we can use a simple approach
    const sheets = google.sheets({ version: 'v4' });

    // If your sheet is public, you can use an API key
    const API_KEY = process.env.GOOGLE_API_KEY;

    // Replace with your actual spreadsheet ID and range
    const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
    const RANGE = 'Werven!A1:A1000'; // Adjust as needed

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      key: API_KEY
    });

    console.log('Response:', response);

    // Return the data
    return {
      data: response.data.values,
      success: true
    };
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    return {
      error: error.message,
      success: false
    };
  }
});
