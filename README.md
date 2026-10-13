# Exam content hub

A static Vercel frontend for browsing exam tabs, page names, and metadata from Google Sheets. The repository root contains `index.html` and `data.json`, so the site can deploy from the default Vercel root directory. The snapshot contains 149 exams; live updates come from the Google Apps Script endpoint.

## Connect Google Sheets once

1. Open the target Google Sheet and select **Extensions → Apps Script**.
2. Replace the script editor's `Code.gs` with [`apps-script/Code.gs`](apps-script/Code.gs). Set `SPREADSHEET_ID` to the ID between `/d/` and `/edit` in the Sheet URL.
3. Select **Deploy → New deployment → Web app**, execute as yourself, and choose who can read the exam data. Authorize the read access.
4. Copy the deployment URL ending in `/exec`. In `index.html`, replace `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL` in `API_URL` with that URL.
5. Commit/push the updated `index.html` to `main`. Vercel will redeploy when the repository is connected to the Vercel project.

The site checks Google Sheets every 60 seconds while visible and when the visitor returns to the page. Changes to spreadsheet tabs, page rows, and metadata do not require a website deployment. Changes to the Apps Script code require a new Apps Script deployment version. Keep the spreadsheet ID out of the public frontend. The Apps Script endpoint only reads and returns sheet content. Anyone allowed to visit the deployed website can see the data returned by Apps Script.

## Sheet layout

Each exam is a sheet tab. Put `Page Name`, `Meta Title`, `Meta Description`, `Meta Keywords`, and `Structure Data` in columns A–E of row 1. Add one page per row starting in row 2. Optionally put the full exam display name in G1 when a tab name is shortened. Keep page names unique within each tab.

`data.json` is a snapshot used while live sync is unavailable. To refresh the snapshot, update the JSON from the current workbook or Google Sheets data and push the new file. Live connected views always use the latest successful Apps Script response.

## Vercel

Connect `1PxFraGGer/hmhmh` to Vercel and set the project root directory to `.` (repository root). No build command is needed; serve the static files as-is. A push to `main` triggers production deployment when the Git integration is enabled.

