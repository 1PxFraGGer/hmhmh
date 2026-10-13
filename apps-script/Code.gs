// Paste the ID from the Google Sheets URL between /d/ and /edit.
const SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID';

function doGet(e) {
  const callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    if (!/^[A-Za-z_$][\w$]*$/.test(callback)) {
      return ContentService.createTextOutput('Invalid callback');
    }
    const payload = JSON.stringify(getExamData()).replace(/</g, '\\u003c');
    return ContentService.createTextOutput(callback + '(' + payload + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return HtmlService.createHtmlOutputFromFile('Index').setTitle('Exam content hub');
}

function getExamData() {
  const book = SpreadsheetApp.openById(SPREADSHEET_ID);
  const exams = book.getSheets().map(sheet => {
    const data = sheet.getDataRange().getDisplayValues();
    const headers = data[0] || [];
    const fieldIndexes = headers.slice(1, 5)
      .map((label, i) => ({label: label.trim(), index: i + 1}))
      .filter(x => x.label);
    const fullName = (data[0] && data[0][6]) ||
      (!fieldIndexes.some(x => x.label === 'Meta Description') && data[0] && data[0][2]) ||
      sheet.getName();
    return {
      id: String(sheet.getSheetId()),
      name: fullName,
      tab: sheet.getName(),
      pages: data.slice(1).filter(row => String(row[0] || '').trim()).map(row => ({
        name: row[0].trim(),
        fields: Object.fromEntries(fieldIndexes.map(x => [x.label, row[x.index] || '']))
      }))
    };
  });
  return {exams, checkedAt: new Date().toISOString()};
}

