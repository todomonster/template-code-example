// 每個 Google Cloud Platform 帳戶都有每月免費的使用額度。
// 目前的免費使用額度為每月 100 個請求單位 (Requests) 和每日 40,000 個單位消耗量 (Consumption)。 ?未查證 byGPT3.5
// npm install googleapis
const { google } = require('googleapis');
const { spreadsheetId } = require('./env.js');
const credentials = require('./credentials.json');

// 設定 Google Sheets API 的授權範圍和認證資訊
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    scopes
);

// 建立 Google Sheets 客戶端
const sheets = google.sheets({ version: 'v4', auth: client });

/**
 * Add
 * @param {*} sheetData 
 */
function addDataToSheet(sheetData = []) {
    const range = 'Sheet1';
    sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: sheetData
    }, (err, response) => {
        if (err) {
            console.error('發生錯誤:', err);
            return;
        }
        console.log('資料已成功儲存到 Google Sheets。');
    });
}
// 將資料寫入指定的儲存格
// 若不寫 !A1:B3 也可以 資料會直接加在最後一列
const data = {
    values: [
        ['任務', '狀態'],
        ['完成作業', '未完成'],
        ['購買食材', '已完成']
    ]
};
addDataToSheet(data);

/**
 * GET 資料
 * @param {*} sheetRange 
 */
function getDataFromSheet(sheetRange = 'Sheet1!A1:B1') {
    sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetRange,
    }, (err, response) => {
        if (err) {
            console.error('發生錯誤:', err);
            return;
        }
        const data = response.data.values;
        console.log('從 Google Sheets 獲取到的資料:', data);
        // 在這裡處理資料的邏輯
    });
}
getDataFromSheet('Sheet1!A1:B3');
// 從 Google Sheets 獲取到的資料: [ [], [ '完成作業', '未完成' ], [ '購買食材', '已完成' ] ]

/**
 *  PUT 資料
 * @param {*} sheetRange 
 * @param {*} sheetData 
 */
function updateDataInSheet(sheetRange = 'Sheet1!A1:B1', sheetData = []) {
    sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: sheetRange,
        valueInputOption: 'USER_ENTERED',
        resource: sheetData
    }, (err, response) => {
        if (err) {
            console.error('發生錯誤:', err);
            return;
        }
        console.log('資料已成功更新到 Google Sheets。');
    });
}
// const data = {
//     values: [
//         ['任務a', '狀態b'],
//     ]
// };
// updateDataInSheet('Sheet1!A1:B1', data);

/**
 * DELETE 資料
 * @param {*} sheetRange 
 */
function deleteDataFromSheet(sheetRange = 'Sheet1!A1:B1') {
    sheets.spreadsheets.values.clear({
        spreadsheetId: spreadsheetId,
        range: sheetRange,
    }, (err, response) => {
        if (err) {
            console.error('發生錯誤:', err);
            return;
        }
        console.log('資料已成功從 Google Sheets 中刪除。');
    });
}
// deleteDataFromSheet('Sheet1!A1:B1');