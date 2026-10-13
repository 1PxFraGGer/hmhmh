# Exam content hub

This draft uses all 149 exam tabs from your updated workbook. Choose an exam in the dropdown, then choose a page button on the left to see its metadata. Blank spreadsheet cells display “No entry yet”. The local draft contains a workbook snapshot; it is not connected to Google Sheets until deployed below.

## Connect your Google Sheet and deploy

1. Upload the updated workbook to Google Drive and open/save it as a Google Sheet, or use your existing Google Sheet with the same tabs.
2. In Google Sheets, open **Extensions → Apps Script**.
3. Replace the script editor's Code.gs with the supplied Code.gs. Set `SPREADSHEET_ID` to the part of your Google Sheet URL between `/d/` and `/edit`.
4. Add an HTML file named **Index** and paste the complete supplied Index.html into it.
5. Choose **Deploy → New deployment → Web app**. Execute as yourself. Choose the audience that should be able to read this exam content; everyone with access to the deployed app can read the returned sheet data. Authorize the spreadsheet read permission and open the returned `/exec` URL.
6. Keep editing the Google Sheet. Content changes need no website redeployment. Adding/removing tabs and page rows updates the dropdown and sidebar automatically. Frontend/script changes require an updated deployment.

The app checks the sheet every 60 seconds while visible, when returning to the tab, and when Refresh is clicked. It displays the last successful data if a refresh fails and shows a sync error. The refresh time means “last checked,” not “last edited.” No recurring automation is required. Request frequency scales with active visitors; a high-traffic public deployment should use a backend cache/API rather than one Apps Script request per minute per visitor.

## Spreadsheet format

Row 1: `Page Name`, `Meta Title`, `Meta Description`, `Meta Keywords`, `Structure Data` in columns A–E. Rows 2 onward: one page per row. G1 optionally holds a full exam name when the tab name is shortened. Field values, including structured data, are rendered as plain text. Empty and renamed tabs are reflected on the next successful refresh. Keep page names unique within each tab.

## Local preview

Open Index.html in a browser for the snapshot preview, or serve this directory with `python -m http.server 8765` and open `http://localhost:8765/Index.html`.

Google documentation: https://developers.google.com/apps-script/guides/web and https://developers.google.com/apps-script/guides/html/communication
